import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getBookAll = async (page, pageSize, search) => {
  const offset = (page - 1) * pageSize
  const querySearch = search ? `WHERE co.nombre ~* $3 OR co.autor ~* $3` : ''
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
      ) AS categories
    FROM CONTENIDO co
      LEFT JOIN R_CONTENIDO_CATEGORIA r on r.id_contenido = co.id
      LEFT JOIN CATEGORIA ca on ca.id = r.id_categoria
    ${querySearch}
    GROUP BY co.id, co.nombre, autor, url_texto, url_portada, url_audio
    LIMIT $1 OFFSET $2
  `

  try {
    const params = search ? [pageSize, offset, search] : [pageSize, offset]
    const result = await pool.query(query, params)
    return result.rows
  } catch (err) {
    console.error('MODEL getBookAll:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}

export const getBookAllCount = async (search) => {
  const querySearch = search ? 'WHERE nombre ~* $1 OR autor ~* $1' : ''
  const query = `SELECT 1 FROM CONTENIDO ${querySearch}`

  try {
    const params = search ? [search] : []
    const result = await pool.query(query, params)
    return result.rowCount
  } catch (err) {
    console.error('MODEL getBookAllCount:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
