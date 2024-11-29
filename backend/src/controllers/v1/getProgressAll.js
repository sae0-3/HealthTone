import { getProgressAll as getAll } from '../../models/v1/index.js'
import { AccessDeniedError } from '../../utils/CustomError.js'


export const getProgressAll = async (req, res) => {

  try {
    if (!req.user) {
      throw new AccessDeniedError()
    }

    const books = await getAll(req.user.id)

    res.status(200).json({
      books,
    })
  } catch (err) {
    console.error('CONTROLLER getProgress:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}