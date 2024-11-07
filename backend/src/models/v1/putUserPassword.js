import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const putUserPassword = async (id_user, new_password) => {
  const query = 'UPDATE USUARIO SET clave = $1 WHERE id = $2'

  try {
    await pool.query(query, [new_password, id_user])
  } catch (err) {
    console.error('MODEL putUserPassword:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
