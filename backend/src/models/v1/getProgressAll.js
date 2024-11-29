import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getProgressAll = async (id_user) => {
  const query = `
    SELECT
        co.id as id,
        co.nombre as title,
        autor as author,
        url_texto as text_path,
        url_portada as cover_path,
        url_audio as audio_path,
        COALESCE(
            (
                SELECT ROUND(AVG(calif.calificacion)::numeric, 1)
                FROM CALIFICACION calif
                WHERE calif.id_contenido = co.id
            ),
            0
        ) AS rating
    FROM PROGRESO p
        JOIN CONTENIDO co ON p.id_contenido = co.id AND p.id_usuario = $1
    ORDER BY p.fecha DESC
  `
  

  try {
    const result = await pool.query(query, [id_user])
    return result.rows
  } catch (err) {
    console.error('MODEL getProgressAll:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}



