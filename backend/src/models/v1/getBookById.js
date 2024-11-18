import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getBookById = async (id) => {
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
      COUNT(v.id) as views,
      COALESCE(
        (
          SELECT ROUND(AVG(calif.calificacion)::numeric, 1)
          FROM CALIFICACION calif
          WHERE calif.id_contenido = co.id
        ),
        0
    ) AS rating
    FROM CONTENIDO co
      LEFT JOIN R_CONTENIDO_CATEGORIA r on id_contenido = co.id
      LEFT JOIN CATEGORIA ca on ca.id = id_categoria
      LEFT JOIN VISUALIZACION v on v.id_contenido = co.id
    WHERE co.id = $1
    GROUP BY co.id, co.nombre, autor, url_texto, url_portada, url_audio
  `

  try {
    const result = await pool.query(query, [id])
    return result.rows[0]
  } catch (err) {
    console.error('MODEL getBookById:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
