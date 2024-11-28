import { getBooksByCategorie as getBooks, getBooksByCategorieCount } from '../../models/v1/index.js'


export const getBooksByCategorie = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query
  const categorie = req.params.id

  try {
    const startTime = Date.now()
    const books = await getBooks(page, pageSize, categorie)
    const totalCount = await getBooksByCategorieCount(categorie)
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
    console.error('CONTROLLER getBooksByCategorie:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}
