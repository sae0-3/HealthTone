import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getProgress = async (id_user) => {
  const query = `
    SELECT
      id,
      nombre as title,
      autor as author,
      url_portada as cover,
      url_audio as url,
      progreso as progress
    FROM PROGRESO p
      JOIN CONTENIDO co on co.id = p.id_contenido
    WHERE p.id_usuario = $1
    ORDER BY p.fecha DESC
  `

  try {
    const result = await pool.query(query, [id_user])
    return result.rows[0]
  } catch (err) {
    console.error('MODEL getProgress:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}