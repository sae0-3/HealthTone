import { pool } from '../config/db.js';
import { getProgresoById } from '../models/progreso.models.js';

const getProgressByUserAndContent = async (req, res) => {
  const { id_usuario, id_contenido } = req.params;

  try {
    const progreso = await getProgresoById(id_usuario, id_contenido);
    if (progreso !== null) {
      res.json({ progreso });
    } else {
      res.json({ progreso: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el progreso' });
  }
};
const updateProgreso = async (req, res) => {
    const { id_usuario, id_contenido, progreso } = req.body;
    const query = `
    INSERT INTO PROGRESO (id_usuario, id_contenido, progreso)
        VALUES ($1, $2, $3)
        ON CONFLICT (id_usuario, id_contenido)
        DO UPDATE SET progreso = EXCLUDED.progreso
        RETURNING progreso;
    `;

    try {
        const result = await pool.query(query, [id_usuario, id_contenido, progreso]);
        res.json({ progreso: result.rows[0].progreso });
    } catch (error) {
        console.error('Error al actualizar el progreso xd:', error);
        res.status(500).json({ error: `Error al actualizar el progreso ${error}, id user = ${id_usuario}, id cont = ${id_contenido}, progreso = ${progreso}` });
    }
};

export{
    getProgressByUserAndContent,
    updateProgreso
}
