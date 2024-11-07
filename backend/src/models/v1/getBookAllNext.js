import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getBookAllNext = async (page, pageSize) => {
  const offset = (page - 1) * pageSize
  const query = `
    SELECT
      e.id as id,
      e.nombre as title,
      autor as author,
      url_portada as cover_path,
      publicado as public_date,
      COALESCE(
        json_agg(
          json_build_object(
            'id',ca.id,
            'name',ca.nombre
          )
        ) FILTER (WHERE ca.id IS NOT NULL),
        '[]'
      ) AS categories
    FROM ESTRENO e
      LEFT JOIN R_ESTRENO_CATEGORIA r on r.id_estreno = e.id
      LEFT JOIN CATEGORIA ca on ca.id = r.id_categoria
    GROUP BY e.id, e.nombre, autor, url_portada, publicado
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

export const getBookAllNextCount = async () => {
  const query = 'SELECT 1 FROM ESTRENO'

  try {
    const result = await pool.query(query)
    return result.rowCount
  } catch (err) {
    console.error('MODEL getBookAllNextCount:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
