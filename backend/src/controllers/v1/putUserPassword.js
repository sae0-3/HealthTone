import bcrypt from 'bcryptjs'
import { putUserPassword as change } from '../../models/v1/index.js'
import { InvalidPasswordError, MissingCredentialsError } from '../../utils/CustomError.js'
import { isValidPassword } from '../../utils/validatePassword.js'


export const putUserPassword = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      throw new MissingCredentialsError()
    }

    if (!isValidPassword(password)) {
      throw new InvalidPasswordError()
    }

    const hashedPassword = await bcrypt.hash(password, 7)
    await change(email, hashedPassword)
    res.status(201).send('Contraseña cambiada')
  } catch (err) {
    console.error('CONTROLLER putUserPassword:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error al cambiar la contraseña.',
    })
  }
}
