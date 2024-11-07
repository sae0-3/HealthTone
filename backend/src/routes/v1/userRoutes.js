import { Router } from 'express'
import passport from '../../config/passport.js'
import { getUser } from '../../controllers/v1/index.js'


const userRoutes = Router()

userRoutes.get('/profile', passport.authenticate('jwt', { session: false }), getUser)

export default userRoutes
