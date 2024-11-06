import { Router } from 'express'
import { login, postUser } from '../../controllers/v1/index.js'


const authRoutes = Router()

authRoutes.post('/login', login)
authRoutes.post('/register', postUser)

export default authRoutes
