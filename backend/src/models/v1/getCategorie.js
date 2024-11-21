import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getCategorie = async (id) => {
  const query = 'SELECT id, nombre as name, descripcion as description FROM CATEGORIA WHERE id = $1'

  try {
    const result = await pool.query(query, [id])
    return result.rows[0]
  } catch (err) {
    console.error('MODEL getCategorie:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
