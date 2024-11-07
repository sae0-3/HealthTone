import { deleteFavorite as remove } from '../../models/v1/index.js'
import { AccessDeniedError, CustomError, InvalidAudiobookIDError } from '../../utils/CustomError.js'


export const deleteFavorite = async (req, res) => {
  const id_content = req.params.id

  try {
    if (!req.user) {
      throw new AccessDeniedError()
    }

    if (isNaN(id_content)) {
      throw new InvalidAudiobookIDError()
    }

    const modified = await remove(req.user.id, id_content)
    if (!modified) {
      throw new CustomError('El favorito no existe, no se puede eliminar.', 404)
    }

    res.status(201).send('Favorito eliminado')
  } catch (err) {
    console.error('CONTROLLER deleteFavorite:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error al eliminar el favorito.',
    })
  }
}
