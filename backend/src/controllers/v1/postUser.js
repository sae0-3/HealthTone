import bcrypt from 'bcryptjs'
import { postUser as createUser, getUserByEmail } from '../../models/v1/index.js'
import {
  EmailExistsError,
  InvalidPasswordError,
  MissingCredentialsError,
} from '../../utils/CustomError.js'
import { isValidPassword } from '../../utils/validatePassword.js'


export const postUser = async (req, res) => {
  const { name, lastname, email, password } = req.body

  try {
    if (!name || !email || !password) {
      throw new MissingCredentialsError()
    }

    const user = await getUserByEmail(email)
    if (user) {
      throw new EmailExistsError()
    }

    if (!isValidPassword(password)) {
      throw new InvalidPasswordError()
    }

    const hashedPassword = await bcrypt.hash(password, 7)
    const result = await createUser({ name, lastname, email, password: hashedPassword })
    res.status(201).json({
      user: result,
    })
  } catch (err) {
    console.error('REGISTER ERROR:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error en la creación de la cuenta',
    })
  }
}
