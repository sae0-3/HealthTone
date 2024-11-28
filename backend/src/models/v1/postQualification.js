import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const postQualification = async (id_user, id_content, qualification) => {
  const query = `
    INSERT INTO CALIFICACION (id_usuario, id_contenido, calificacion)
    VALUES ($1, $2, $3)
    ON CONFLICT (id_usuario, id_contenido)
    DO UPDATE SET calificacion = EXCLUDED.calificacion, fecha = NOW()
  `

  try {
    await pool.query(query, [id_user, id_content, qualification])
  } catch (err) {
    console.error('MODEL postQualification:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
