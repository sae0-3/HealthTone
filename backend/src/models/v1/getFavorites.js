import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getFavorites = async (page, pageSize, id_user, search) => {
  const offset = (page - 1) * pageSize
  const querySearch = search ? `AND (co.nombre ~* $4 OR co.autor ~* $4)` : ''
  const query = `
    SELECT
      co.id as id,
      fa.fecha as date,
      co.nombre as title,
      co.autor as author,
      co.url_texto as text_path,
      co.url_portada as cover_path,
      co.url_audio as audio_path,
      COALESCE(
        json_agg(
          json_build_object(
            'id', ca.id,
            'nombre', ca.nombre
          )
        ) FILTER (WHERE ca.id IS NOT NULL),
        '[]'
      ) AS categories,
      COALESCE(
        (
          SELECT ROUND(AVG(ca.calificacion)::numeric, 1)
          FROM CALIFICACION ca
          WHERE ca.id_contenido = co.id
        ),
        0
    ) AS rating
    FROM FAVORITO fa
      JOIN CONTENIDO co ON fa.id_contenido = co.id
      LEFT JOIN R_CONTENIDO_CATEGORIA r ON co.id = r.id_contenido
      LEFT JOIN CATEGORIA ca ON ca.id = r.id_categoria
    WHERE fa.id_usuario = $3 ${querySearch}
    GROUP BY 
      co.id,
      fa.fecha,
      co.nombre,
      co.autor,
      co.url_texto,
      co.url_portada,
      co.url_audio
    ORDER BY fa.fecha DESC
    LIMIT $1 OFFSET $2
  `

  try {
    const params = search ? [pageSize, offset, id_user, search] : [pageSize, offset, id_user]
    const result = await pool.query(query, params)
    return result.rows
  } catch (err) {
    console.error('MODEL getFavorites:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}

export const getFavoritesCount = async (id_user, search) => {
  const querySearch = search ? `AND (co.nombre ~* $2 OR co.autor ~* $2)` : ''
  const query = `
    SELECT 1
    FROM FAVORITO fa
      JOIN CONTENIDO co ON fa.id_contenido = co.id
      WHERE fa.id_usuario = $1 ${querySearch}
  `

  try {
    const params = search ? [id_user, search] : [id_user]
    const result = await pool.query(query, params)
    return result.rowCount
  } catch (err) {
    console.error('MODEL getFavoritesCount:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
