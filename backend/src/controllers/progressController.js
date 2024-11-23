import { pool } from '../config/db.js';

export const saveProgress = async (req, res) => {
  const { id_usuario, id_contenido, progreso } = req.body;

  if (!id_usuario || !id_contenido || progreso === undefined) {
    return res.status(400).send('Faltan parámetros requeridos');
  }

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

export const getProgress = async (req, res) => {
  const { id_usuario, id_contenido } = req.query;

  if (!id_usuario || !id_contenido) {
    return res.status(400).send('Faltan parámetros requeridos');
  }

  try {
    const { rows } = await pool.query(
      'SELECT progreso FROM PROGRESO WHERE id_usuario = $1 AND id_contenido = $2',
      [id_usuario, id_contenido]
    );

    if (rows.length > 0) {
      res.status(200).json({ progreso: rows[0].progreso });
    } else {
      res.status(404).json({ mensaje: 'No se encontró progreso para este contenido' });
    }
  } catch (error) {
    console.error('Error al obtener el progreso:', error);
    res.status(500).send('Error al obtener el progreso');
  }
};
