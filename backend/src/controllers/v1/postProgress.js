import { getBookById, postProgress as save } from '../../models/v1/index.js'
import {
  AccessDeniedError,
  AudiobookNotFoundError,
  InvalidAudiobookIDError,
  MissingCredentialsError
} from '../../utils/CustomError.js'


export const postProgress = async (req, res) => {
  const { id_content, progress } = req.body

  try {
    if (!req.user) {
      throw new AccessDeniedError()
    }

    if (!progress || !id_content) {
      throw new MissingCredentialsError()
    }

    if (isNaN(id_content)) {
      throw new InvalidAudiobookIDError()
    }

    const book = await getBookById(id_content)

    if (!book) {
      throw new AudiobookNotFoundError()
    }

    await save(req.user.id, id_content, progress)
    res.status(201).send('Progreso guardado')
  } catch (err) {
    console.error('CONTROLLER postProgress:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error al guardar el favorito.',
    })
  }
}
