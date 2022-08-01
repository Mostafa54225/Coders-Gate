import express from 'express'
import { createComment, deleteComment, getComments, updateComment } from '../handlers/commentHandler'
const router = express.Router()

router.route('/:postId').post(createComment).get(getComments)
router.route('/:commentId').delete(deleteComment).patch(updateComment)

export default router