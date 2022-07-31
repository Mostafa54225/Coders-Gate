import express from 'express'
import { signIn, signUp } from '../handlers/userHandler'
const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)

export default router