import { getBookById as getBook } from '../../models/v1/index.js'
import { AudiobookNotFoundError, InvalidAudiobookIDError } from '../../utils/CustomError.js'


export const getBookById = async (req, res) => {
  const id = req.params.id

  try {
    if (isNaN(id) || Number(id) <= 0) {
      throw new InvalidAudiobookIDError()
    }

    const book = await getBook(id)

    if (!book) {
      throw new AudiobookNotFoundError()
    }

    res.status(200).json(book)
  } catch (err) {
    console.error('CONTROLLER getBookById:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}
