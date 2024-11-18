import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const postComment = async (id_user, id_content, message) => {
  const query = 'INSERT INTO COMENTARIO (id_contenido, id_usuario, mensaje) VALUES ($1, $2, $3)'

  try {
    await pool.query(query, [id_content, id_user, message])
  } catch (err) {
    console.error('MODEL postComment:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
