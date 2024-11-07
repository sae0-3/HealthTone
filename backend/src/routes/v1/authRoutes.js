import { Router } from 'express'
import { login, postUser, sendRecoveryEmail } from '../../controllers/v1/index.js'


const authRoutes = Router()

authRoutes.post('/login', login)
authRoutes.post('/register', postUser)
authRoutes.post('/send_recovery_email', sendRecoveryEmail)

export default authRoutes
