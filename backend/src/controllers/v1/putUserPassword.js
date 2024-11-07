import { putUserPassword as change } from '../../models/v1/index.js'
import { AccessDeniedError, InvalidPasswordError, MissingCredentialsError } from '../../utils/CustomError.js'
import { isValidPassword } from '../../utils/validatePassword.js'


export const putUserPassword = async (req, res) => {
  const { password } = req.body

  try {
    if (!req.user) {
      throw new AccessDeniedError()
    }

    if (!password) {
      throw new MissingCredentialsError()
    }

    if (!isValidPassword(password)) {
      throw new InvalidPasswordError()
    }

    await change(req.user.id, password)
    res.status(201).send('Contraseña cambiada')
  } catch (err) {
    console.error('CONTROLLER putUserPassword:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error al cambiar la contraseña.',
    })
  }
}
