import express from 'express'
import { getUserById, getUsers, updateUser } from '../handlers/userHandler'
import { verifyUser } from '../middleware/authMiddleware'
const router = express.Router()


router.get('/', getUsers)
router.route('/:userId').get(getUserById).patch(verifyUser, updateUser)

export default router