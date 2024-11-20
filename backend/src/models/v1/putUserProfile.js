import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const putUserProfile = async (email, genero, nacimiento, pais, telefono) => {
  const query = 'UPDATE USUARIO SET email=$1, genero=$2, nacimiento=$3, pais=$4, telefono=$5 WHERE email = $1'

  try {
    await pool.query(query, [email, genero, nacimiento, pais, telefono])
  } catch (err) {
    console.error('MODEL putUserProfile:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
