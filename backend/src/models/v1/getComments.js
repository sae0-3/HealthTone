import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getComments = async (page, pageSize, id_content) => {
  const offset = (page - 1) * pageSize
  const query = `
    SELECT
      c.id,
      json_build_object(
        'id',u.id,
        'name',u.nombre,
        'lastname',apellidos,
        'username',username,
        'profile',perfil
      ) as author,
      mensaje as message,
      c.fecha as date
    FROM COMENTARIO c
      JOIN USUARIO u on u.id = c.id_usuario
    WHERE id_contenido = $3
    ORDER BY c.fecha DESC
    LIMIT $1 OFFSET $2
  `

  try {
    const params = [pageSize, offset, id_content]
    const result = await pool.query(query, params)
    return result.rows
  } catch (err) {
    console.error('MODEL getComments:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}

export const getCommentsCount = async (id_content) => {
  const query = 'SELECT 1 FROM COMENTARIO WHERE id_contenido = $1'

  try {
    const result = await pool.query(query, [id_content])
    return result.rowCount
  } catch (err) {
    console.error('MODEL getCommentsCount:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
