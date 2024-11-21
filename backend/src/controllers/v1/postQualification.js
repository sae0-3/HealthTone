import { getBookById, postQualification as post } from '../../models/v1/index.js'
import {
  AccessDeniedError,
  AudiobookNotFoundError,
  InvalidAudiobookIDError,
  MissingCredentialsError
} from '../../utils/CustomError.js'


export const postQualification = async (req, res) => {
  const { id_content, qualification } = req.body

  try {
    if (!req.user) {
      throw new AccessDeniedError()
    }

    if (!qualification || !id_content) {
      throw new MissingCredentialsError()
    }

    if (isNaN(id_content) || isNaN(qualification)) {
      throw new InvalidAudiobookIDError()
    }

    const book = await getBookById(id_content)

    if (!book) {
      throw new AudiobookNotFoundError()
    }

    await post(req.user.id, id_content, qualification)
    res.status(201).send('Calificacion guardado')
  } catch (err) {
    console.error('CONTROLLER postQualification:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error al guardar la calificacion.',
    })
  }
}
