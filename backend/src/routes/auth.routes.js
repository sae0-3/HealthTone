import { Router } from 'express'
import passport from '../config/passport.js'
import { login, register } from '../controllers/auth.controllers.js'


const authRoutes = Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.get('/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({
    user: {
      id: req.user.id,
      name: req.user.nombre,
      email: req.user.email
    }
  })
})

export default authRoutes
