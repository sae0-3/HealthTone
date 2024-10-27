import { Router } from 'express'
import { register } from '../controllers/auth.controllers.js'


const authRoutes = Router()

authRoutes.post('/register', register)

export default authRoutes
