import {
  getBookAllCount,
  getBookAllNew,
  getBookAllNewCount,
  getBookAllNext,
  getBookAllNextCount,
  getBookAllPop,
  getBookAllPopCount,
  getBookAll as getBooks,
} from '../../models/v1/index.js'
import { CustomError, ValidationPageError } from '../../utils/CustomError.js'


export const getBookAll = async (req, res) => {
  const { page = 1, pageSize = 10, section, search } = req.query

  try {
    if (page < 1 || pageSize < 1) {
      throw new ValidationPageError()
    }

    const startTime = Date.now()
    let books, totalCount

    if (!section) {
      books = await getBooks(page, pageSize, search)
      totalCount = await getBookAllCount(search)
    } else {
      const sectionQueries = {
        'sugerencias': { getData: getBooks, getCount: getBookAllCount },
        'nuevos': { getData: getBookAllNew, getCount: getBookAllNewCount },
        'populares': { getData: getBookAllPop, getCount: getBookAllPopCount },
        'proximos': { getData: getBookAllNext, getCount: getBookAllNextCount },
      }

      const selectedSection = sectionQueries[section]
      if (!selectedSection) {
        throw new CustomError('La seccion no existe.', 404)
      }

      books = await selectedSection.getData(page, pageSize)
      totalCount = await selectedSection.getCount()
    }

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
    console.error('CONTROLLER getBookAll:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}
