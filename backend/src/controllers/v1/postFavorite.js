import { postFavorite as save } from '../../models/v1/index.js'
import { AccessDeniedError, InvalidAudiobookIDError } from '../../utils/CustomError.js'


export const postFavorite = async (req, res) => {
  const id_content = req.params.id

  try {
    if (!req.user) {
      throw new AccessDeniedError()
    }

    if (isNaN(id_content)) {
      throw new InvalidAudiobookIDError()
    }

    await save(req.user.id, id_content)
    res.status(201).send('Favorito guardado')
  } catch (err) {
    console.error('CONTROLLER postFavorite:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error al guardar el favorito.',
    })
  }
}
