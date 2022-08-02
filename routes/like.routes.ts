import express from 'express'
import { createLike, getLikesByPostId } from '../handlers/likeHandler'
const router = express.Router()

router.route('/:postId').post(createLike).get(getLikesByPostId)

export default router