import { pool } from '../config/db.js';

export const getProgresoById = async (id_usuario, id_contenido) => {
  const query = `SELECT progreso FROM PROGRESO WHERE id_usuario = $1 AND id_contenido = $2`;

  try {
    const result = await pool.query(query, [id_usuario, id_contenido]);
    return result.rows.length > 0 ? result.rows[0].progreso : null;
  } catch (error) {
    console.error('Error al obtener progreso:', error);
    throw new Error('Error en la base de datos al obtener progreso');
  }
};

