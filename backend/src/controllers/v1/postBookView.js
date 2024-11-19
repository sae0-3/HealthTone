import { postBookView as save } from '../../models/v1/index.js'
import { AccessDeniedError, InvalidAudiobookIDError } from '../../utils/CustomError.js'


export const postBookView = async (req, res) => {
  const id_content = req.params.id

  try {
    if (!req.user) {
      throw new AccessDeniedError()
    }

    if (isNaN(id_content)) {
      throw new InvalidAudiobookIDError()
    }

    await save(req.user.id, id_content)
    res.status(201).send('Visualizacion registrada')
  } catch (err) {
    console.error('CONTROLLER postBookView:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error al registrar la visualización.',
    })
  }
}
