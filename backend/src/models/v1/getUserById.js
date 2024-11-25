import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getUserById = async (id) => {
  const query = `
    SELECT
      id,
      nombre,
      apellidos,
      username,
      perfil,
      email,
      clave as password,
      nacimiento,
      pais,
      telefono,
      genero,
      se_unio
    FROM USUARIO
    WHERE id = $1
  `

  try {
    const result = await pool.query(query, [id])
    return result.rows[0]
  } catch (err) {
    console.error('MODEL getUserById:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
