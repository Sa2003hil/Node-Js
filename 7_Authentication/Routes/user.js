import express from 'express'
import { handleUserSignUp, handleUserLogin } from '../Controller/user.js'

const router = express.Router()

router.post('/', handleUserSignUp)
router.post('/login', handleUserLogin)

export default router
