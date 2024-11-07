import { Router } from 'express'
import { login, postUser } from '../../controllers/v1/index.js'
import { sendEmail } from '../../config/email.js'


const authRoutes = Router()

authRoutes.post('/login', login)
authRoutes.post('/register', postUser)

authRoutes.post("/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message))
})

export default authRoutes
