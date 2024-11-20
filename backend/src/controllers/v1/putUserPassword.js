import bcrypt from 'bcryptjs'
import { putUserPassword as change } from '../../models/v1/index.js'
import { InvalidPasswordError, MissingCredentialsError, UserNotFoundError, InvalidCredentialsError} from '../../utils/CustomError.js'
import { isValidPassword } from '../../utils/validatePassword.js'
import { getUserByEmail } from '../../models/v1/index.js'


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

export const putUserPasswordWithPassword = async (req, res) => {
  const { email, password, newPassword } = req.body

  try {
    if (!email || !password || !newPassword) {
      throw new MissingCredentialsError()
    }

    if (!isValidPassword(newPassword)) {
      throw new InvalidPasswordError()
    }

    const user = await getUserByEmail(email)
    if (!user) {
      throw new UserNotFoundError()
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new InvalidCredentialsError()
    }

    const hashedPassword = await bcrypt.hash(newPassword, 7)
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
