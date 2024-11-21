import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getCategories = async () => {
  const query = 'SELECT id, nombre as name, descripcion as desc FROM CATEGORIA'

  try {
    const result = await pool.query(query)
    return result.rows
  } catch (err) {
    console.error('MODEL getCategories:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
