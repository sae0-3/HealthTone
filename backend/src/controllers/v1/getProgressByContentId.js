import { getProgressByContentId as get } from '../../models/v1/index.js'
import { AccessDeniedError, InvalidAudiobookIDError } from '../../utils/CustomError.js'


export const getProgressByContentId = async (req, res) => {
  const {id_content} = req.params

  try {
    if (!req.user) {
      throw new AccessDeniedError()
    }
    if (!id_content) {
      throw new InvalidAudiobookIDError()
    }


    const result = await get(req.user.id, id_content)
    res.status(200).json(result)
  } catch (err) {
    console.error('CONTROLLER getProgress:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}
