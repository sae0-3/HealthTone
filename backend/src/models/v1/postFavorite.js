import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const postFavorite = async (id_user, id_content) => {
  const query = 'INSERT INTO FAVORITO (id_contenido, id_usuario) VALUES ($1, $2)'

  try {
    await pool.query(query, [id_content, id_user])
  } catch (err) {
    console.error('MODEL postFavorite:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
