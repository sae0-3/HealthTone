import { getComments as get, getCommentsCount } from '../../models/v1/index.js'
import { InvalidAudiobookIDError, ValidationPageError } from '../../utils/CustomError.js'


export const getComments = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query
  const id = req.params.id

  try {
    if (page < 1 || pageSize < 1) {
      throw new ValidationPageError()
    }

    if (isNaN(id) || Number(id) <= 0) {
      throw new InvalidAudiobookIDError()
    }

    const startTime = Date.now()
    const comments = await get(page, pageSize, id)
    const totalCount = await getCommentsCount(id)
    const executionTime = Date.now() - startTime

    res.status(200).json({
      executionTime: `${executionTime}ms`,
      count: comments.length,
      page: parseInt(page, 10),
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      comments,
    })
  } catch (err) {
    console.error('CONTROLLER getComments:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}
