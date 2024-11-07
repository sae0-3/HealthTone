import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const putUserPassword = async (email, new_password) => {
  const query = 'UPDATE USUARIO SET clave = $1 WHERE email = $2'

  try {
    await pool.query(query, [new_password, email])
  } catch (err) {
    console.error('MODEL putUserPassword:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
