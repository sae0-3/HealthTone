import { Router } from 'express'
import { sendEmail } from '../../config/email.js'
import { login, postUser } from '../../controllers/v1/index.js'


const authRoutes = Router()

authRoutes.post('/login', login)
authRoutes.post('/register', postUser)

authRoutes.post('/send_recovery_email', async (req, res) => {
  const { recipient_email, OTP } = req.body

  try {
    const result = await sendEmail(recipient_email, OTP)
    res.status(200).json(result.message)
  } catch (err) {
    console.error('CONTROLLER recoveryPassword:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
})

export default authRoutes
