import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const postUser = async (user) => {
  const { name, lastname, email, password } = user
  const query = `
    INSERT INTO USUARIO
      (nombre, apellidos, email, clave)
    VALUES ($1, $2, $3, $4)
    RETURNING
      id,
      nombre as name,
      apellidos as lastname,
      email,
      clave as password
  `

  try {
    const result = await pool.query(query, [name, lastname, email, password])
    return result.rows[0]
  } catch (err) {
    console.error('MODEL postUser', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}