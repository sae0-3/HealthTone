import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const deleteFavorite = async (id_user, id_content) => {
  const query = 'DELETE FROM FAVORITO WHERE id_contenido = $1 AND id_usuario = $2'

  try {
    const result = await pool.query(query, [id_content, id_user])
    return result.rowCount
  } catch (err) {
    console.error('MODEL deleteFavorite:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
