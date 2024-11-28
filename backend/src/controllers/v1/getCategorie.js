import { getCategorie as get } from '../../models/v1/index.js'
import { CustomError } from '../../utils/CustomError.js'


export const getCategorie = async (req, res) => {
  const id = req.params.id

  try {
    const categorie = await get(id)

    if (!categorie) {
      throw new CustomError('No se encontro la categoria', 404)
    }

    res.status(200).json(categorie)
  } catch (err) {
    console.error('CONTROLLER getCategorie:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}
