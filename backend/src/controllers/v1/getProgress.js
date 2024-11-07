import { getProgress as get } from '../../models/v1/index.js'
import { AccessDeniedError, InvalidAudiobookIDError } from '../../utils/CustomError.js'


export const getProgress = async (req, res) => {
  try {
    if (!req.user) {
      throw new AccessDeniedError()
    }

    const result = await get(req.user.id)
    res.status(200).json(result)
  } catch (err) {
    console.error('CONTROLLER getProgress:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}
