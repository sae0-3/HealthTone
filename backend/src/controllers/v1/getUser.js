import { UserNotFoundError } from '../../utils/CustomError.js'


export const getUser = async (req, res) => {
  try {
    if (!req.user) {
      throw new UserNotFoundError()
    }

    const { id, name, lastname, email } = req.user
    res.status(200).json({ id, name, lastname, email })
  } catch (err) {
    console.error('CONTROLLER getUser:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}
