import express from 'express'
import { logout, signIn, signUp } from '../handlers/authHandler'
const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/logout', logout)

export default router