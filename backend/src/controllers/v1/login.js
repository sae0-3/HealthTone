import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getUserByEmail } from '../../models/v1/index.js'
import {
  InvalidCredentialsError,
  MissingCredentialsError,
  UserNotFoundError
} from '../../utils/CustomError.js'


export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      throw new MissingCredentialsError()
    }

    const user = await getUserByEmail(email)
    if (!user) {
      throw new UserNotFoundError()
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new InvalidCredentialsError()
    }

    const token = jwt.sign({ id: user.id }, process.env.KEY_JWT, { expiresIn: '7d' })
    res.status(200).json({
      token,
      user: {
        id: user.id,
        nombre: user.name,
        apellidos: user.lastname,
        username: user.username,
        email: user.email,
        perfil: user.perfil,
        nacimiento: user.nacimiento,
        pais: user.pais,
        telefono: user.telefono,
        genero: user.genero,
        se_unio: user.se_unio
      }
    })
  } catch (err) {
    console.error('LOGIN ERROR:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error en el proceso de inicio de sesión',
    })
  }
}
