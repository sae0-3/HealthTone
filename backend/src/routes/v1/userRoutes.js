import { Router } from 'express'
import passport from '../../config/passport.js'
import { getUser, putUserPassword } from '../../controllers/v1/index.js'


const userRoutes = Router()

userRoutes.get('/profile', passport.authenticate('jwt', { session: false }), getUser)
userRoutes.put('/update-password', putUserPassword)

export default userRoutes
