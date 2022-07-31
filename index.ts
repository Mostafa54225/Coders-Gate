import express, { ErrorRequestHandler, RequestHandler } from 'express'
import dotenv from 'dotenv'
import { createPost, getposts } from './handlers/postHandlers'
import asyncHandler from 'express-async-handler'

import postRoutes from './routes/post.routes'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/not_found'
import { initDB } from './datastore'

dotenv.config()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())


const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(`${req.method} ${req.path} ${JSON.stringify(req.body)}`)
    next()
}

app.use(requestLoggerMiddleware)

app.use('/api/posts', asyncHandler(postRoutes))

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