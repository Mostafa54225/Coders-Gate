import express, { RequestHandler } from 'express'
import dotenv from 'dotenv'
import { createPost, getposts } from './handlers/postHandlers'

import postRoutes from './routes/post.routes'

dotenv.config()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())


const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(`${req.method} ${req.path} ${JSON.stringify(req.body)}`)
    next()
}

app.use(requestLoggerMiddleware)

app.use('/api/posts', postRoutes)


app.listen(port, () => console.log(`Server started on port ${port}`))