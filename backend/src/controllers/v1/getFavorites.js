import { getFavoritesCount, getFavorites as getFavs } from '../../models/v1/index.js'
import { AccessDeniedError, ValidationPageError } from '../../utils/CustomError.js'


export const getFavorites = async (req, res) => {
  const { page = 1, pageSize = 10, search } = req.query

  try {
    if (!req.user) {
      throw new AccessDeniedError()
    }

    if (page < 1 || pageSize < 1) {
      throw new ValidationPageError()
    }

    const startTime = Date.now()
    const { id } = req.user
    const books = await getFavs(page, pageSize, id, search)
    const totalCount = await getFavoritesCount(page, pageSize, id, search)
    const executionTime = Date.now() - startTime

    res.status(200).json({
      executionTime: `${executionTime}ms`,
      count: books.length,
      page: parseInt(page, 10),
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      books,
    })
  } catch (err) {
    console.error('CONTROLLER getFavorites:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}
