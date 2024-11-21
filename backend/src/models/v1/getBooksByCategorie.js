import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getBooksByCategorie = async (page, pageSize, categorie) => {
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
        (
          SELECT ROUND(AVG(calif.calificacion)::numeric, 1)
          FROM CALIFICACION calif
          WHERE calif.id_contenido = co.id
        ),
        0
    ) AS rating
    FROM R_CONTENIDO_CATEGORIA rca
      JOIN CONTENIDO co on rca.id_contenido = co.id
      JOIN CATEGORIA ca on rca.id_categoria = ca.id
    WHERE rca.id_categoria = $3
    GROUP BY co.id, co.nombre, autor, url_texto, url_portada, url_audio
    LIMIT $1 OFFSET $2
  `

  try {
    const result = await pool.query(query, [pageSize, offset, categorie])
    return result.rows
  } catch (err) {
    console.error('MODEL getBooksByCategorie:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}

export const getBooksByCategorieCount = async (categorie) => {
  const query = 'SELECT 1 FROM R_CONTENIDO_CATEGORIA WHERE id_categoria = $1'

  try {
    const result = await pool.query(query, [categorie])
    return result.rowCount
  } catch (err) {
    console.error('MODEL getBooksByCategorieCount:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
