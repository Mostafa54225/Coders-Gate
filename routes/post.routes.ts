import express from 'express'
import { createPost, deletePost, getPost, getposts, updatePost } from '../handlers/postHandlers'
import { verifyUser } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/').post(createPost).get(getposts)
router.route('/:postId').get(getPost).delete(deletePost).patch(updatePost)

export default router