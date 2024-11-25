import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const putUserProfile = async (actualEmail, email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero) => {
  const query = 'UPDATE USUARIO SET email=$1, nacimiento=$2, nombre=$3, apellidos=$4, perfil=$5, username=$6, pais=$7, telefono=$8, genero=$9 WHERE email = $10'

  try {
    await pool.query(query, [email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero, actualEmail])
  } catch (err) {
    console.error('MODEL putUserProfile:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
