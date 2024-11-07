import { updateClave } from '../models/v0/user.models.js';

export const updateUserClave = async (req, res) => {
  const { id_usuario, nuevaClave } = req.body;
  
  try {
    const updatedUser = await updateClave(id_usuario, nuevaClave);
    res.json({ message: 'Clave actualizada correctamente', data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la clave' });
  }
};

