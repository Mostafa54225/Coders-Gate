import express from 'express'
import { createPost, getposts } from '../handlers/postHandlers'

const router = express.Router()

router.route('/').post(createPost).get(getposts)

export default router