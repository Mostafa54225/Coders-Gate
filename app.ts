import express, { RequestHandler } from 'express'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'
import cookieParser from 'cookie-parser'
import postRoutes from './routes/post.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import commentRoutes from './routes/comment.routes'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/not_found'
import { initDB } from './datastore'
import { requestLoggerMiddleware } from './middleware/logger'
import { authMiddleware } from './middleware/authMiddleware'

dotenv.config()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cookieParser())


app.use(requestLoggerMiddleware)

app.use('/api/v1/auth', asyncHandler(authRoutes))

app.use(authMiddleware)

app.use('/api/v1/users', asyncHandler(userRoutes))
app.use('/api/v1/posts', asyncHandler(postRoutes))
app.use('/api/v1/comments', asyncHandler(commentRoutes))

app.use(notFound)
app.use(errorHandler)



const start = async () => {
    try {
        await initDB()
        app.listen(port, () => console.log(`Server started on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()