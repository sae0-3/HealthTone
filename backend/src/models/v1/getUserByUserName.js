import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const getUserByUserName = async (userName) => {
  const query = `
    SELECT *
    FROM USUARIO
    WHERE username = $1
  `

  try {
    const result = await pool.query(query, [userName])
    return result.rows[0]
  } catch (err) {
    console.error('MODEL getUserByUserName:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}