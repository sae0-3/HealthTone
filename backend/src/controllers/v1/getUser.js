import { UserNotFoundError } from '../../utils/CustomError.js'


export const getUser = async (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  try {
    if (!req.user) {
      throw new UserNotFoundError()
    }
    const { id, nombre, apellidos,username, email, perfil, clave, nacimiento, pais, telefono, genero, se_unio } = req.user
    res.status(200).json({ token, user: { id, nombre, apellidos,username, email, perfil, clave, nacimiento, pais, telefono, genero, se_unio } })
  } catch (err) {
    console.error('CONTROLLER getUser:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}
