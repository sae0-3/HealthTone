import { getCategories as get } from '../../models/v1/index.js'


export const getCategories = async (req, res) => {
  try {
    const startTime = Date.now()
    const categories = await get()
    const executionTime = Date.now() - startTime

    res.status(200).json({
      executionTime: `${executionTime}ms`,
      categories,
    })
  } catch (err) {
    console.error('CONTROLLER getCategories:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}
