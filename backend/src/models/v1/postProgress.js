import { pool } from '../../config/db.js'
import { InternalServerError } from '../../utils/CustomError.js'
import pgErrors from '../../utils/pgErrors.js'


export const postProgress = async (id_user, id_content, progress) => {
  const query = `
    INSERT INTO PROGRESO (id_usuario, id_contenido, progreso)
    VALUES ($1, $2, $3)
    ON CONFLICT (id_usuario, id_contenido)
    DO UPDATE SET progreso = EXCLUDED.progreso, fecha = NOW()
  `

  try {
    await pool.query(query, [id_user, id_content, progress])
  } catch (err) {
    console.error('MODEL postProgreess:', err)
    throw pgErrors[err.code] || new InternalServerError()
  }
}
