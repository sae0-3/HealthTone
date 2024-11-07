import { Router } from 'express'
import passport from '../../config/passport.js'
import { login, register } from '../../controllers/v0/auth.controllers.js'


const authRoutes = Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.get('/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  res.status(200).json({
    token,
    user: {
      id: req.user.id,
      name: req.user.nombre,
      email: req.user.email
    },
  })
})

authRoutes.post("/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message))
})

export default authRoutes
