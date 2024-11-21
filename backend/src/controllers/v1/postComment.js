import { getBookById, postComment as post } from '../../models/v1/index.js'
import {
  AccessDeniedError,
  AudiobookNotFoundError,
  InvalidAudiobookIDError,
  MissingCredentialsError
} from '../../utils/CustomError.js'


export const postComment = async (req, res) => {
  const { id_content, message } = req.body

  try {
    if (!req.user) {
      throw new AccessDeniedError()
    }

    if (!message || !id_content) {
      throw new MissingCredentialsError()
    }

    if (isNaN(id_content)) {
      throw new InvalidAudiobookIDError()
    }

    const book = await getBookById(id_content)

    if (!book) {
      throw new AudiobookNotFoundError()
    }

    await post(req.user.id, id_content, message)
    res.status(201).send('Comentario guardado')
  } catch (err) {
    console.error('CONTROLLER postComment:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error al guardar el comentario.',
    })
  }
}
