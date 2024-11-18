import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getBookAllNew = async (page, pageSize) => {
  const offset = (page - 1) * pageSize
  const query = `
    SELECT
      co.id as id,
      co.nombre as title,
      autor as author,
      url_texto as text_path,
      url_portada as cover_path,
      url_audio as audio_path,
      COALESCE(
        json_agg(
          json_build_object(
            'id',ca.id,
            'name',ca.nombre
          )
        ) FILTER (WHERE ca.id IS NOT NULL),
        '[]'
      ) AS categories,
      COALESCE(
        (
          SELECT ROUND(AVG(calif.calificacion)::numeric, 1)
          FROM CALIFICACION calif
          WHERE calif.id_contenido = co.id
        ),
        0
    ) AS rating
    FROM CONTENIDO co
      LEFT JOIN R_CONTENIDO_CATEGORIA r on r.id_contenido = co.id
      LEFT JOIN CATEGORIA ca on ca.id = r.id_categoria
    GROUP BY co.id, co.nombre, autor, url_texto, url_portada, url_audio
    ORDER BY fecha_subida DESC
    LIMIT $1 OFFSET $2
  `

  try {
    const result = await pool.query(query, [pageSize, offset])
    return result.rows
  } catch (err) {
    console.error('MODEL getBookAllNew:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}

export const getBookAllNewCount = async () => {
  const query = 'SELECT 1 FROM CONTENIDO'

  try {
    const result = await pool.query(query)
    return result.rowCount
  } catch (err) {
    console.error('MODEL getBookAllNewCount:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
