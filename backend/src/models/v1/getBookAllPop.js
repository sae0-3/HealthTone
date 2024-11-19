import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getBookAllPop = async (page, pageSize) => {
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
      COUNT(v.id) AS views
    FROM CONTENIDO co
      LEFT JOIN R_CONTENIDO_CATEGORIA r on r.id_contenido = co.id
      LEFT JOIN CATEGORIA ca on ca.id = r.id_categoria
      LEFT JOIN VISUALIZACION v on v.id_contenido = co.id
    GROUP BY co.id, co.nombre, autor, url_texto, url_portada, url_audio
    ORDER BY COUNT(v.id) DESC
    LIMIT $1 OFFSET $2
  `

  try {
    const result = await pool.query(query, [pageSize, offset])
    return result.rows
  } catch (err) {
    console.error('MODEL getBookAllPop:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}

export const getBookAllPopCount = async () => {
  const query = 'SELECT 1 FROM CONTENIDO'

  try {
    const result = await pool.query(query)
    return result.rowCount
  } catch (err) {
    console.error('MODEL getBookAllPopCount:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
