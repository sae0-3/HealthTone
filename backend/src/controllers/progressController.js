import { pool } from '../config/db.js';

export const saveProgress = async (req, res) => {
  const { id_usuario, id_contenido, progreso } = req.body;

  try {
    await pool.query(`
      INSERT INTO PROGRESO (id_usuario, id_contenido, progreso)
      VALUES ($1, $2, $3)
      ON CONFLICT (id_usuario, id_contenido)
      DO UPDATE SET progreso = EXCLUDED.progreso;
    `, [id_usuario, id_contenido, progreso]);

    res.status(200).send('Progreso guardado con éxito');
  } catch (error) {
    console.error('Error al guardar el progreso:', error);
    res.status(500).send('Error al guardar el progreso');
  }
};
