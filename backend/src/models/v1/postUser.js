import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const postUser = async (user) => {
  const { name, lastname, email, userName, profile, password } = user
  const query = `
    INSERT INTO USUARIO
      (nombre, apellidos, email, userName, perfil, clave)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING
      id,
      nombre as name,
      apellidos as lastname,
      email,
      username,
      perfil as profile,
      clave as password
  `

  try {
    const result = await pool.query(query, [name, lastname, email, userName, profile, password])
    return result.rows[0]
  } catch (err) {
    console.error('MODEL postUser', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
