import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getUserByEmail = async (email) => {
  const query = `
    SELECT
      id,
      nombre as name,
      apellidos as lastname,
      email,
      clave as password,
      nacimiento,
      pais,
      telefono,
      genero,
      se_unio
    FROM USUARIO
    WHERE email = $1
  `

  try {
    const result = await pool.query(query, [email])
    return result.rows[0]
  } catch (err) {
    console.error('MODEL getUserByEmail:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}