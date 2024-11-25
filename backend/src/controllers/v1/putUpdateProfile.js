import { putUserProfile } from "../../models/v1/index.js"
import { MissingCredentialsError } from "../../utils/CustomError.js"

export const putUpdateProfile = async (req, res) => {
  const { email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero} = req.body
 
  try {
    if (!email) {
      throw new MissingCredentialsError()
    }

    await putUserProfile( email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero)
    res.status(201).send('datos de perfil cambiados correctamente')
  } catch (err) {
    console.error('CONTROLLER putUpdateProfile:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error al cambiar los datos de perfil.',
    })
  }
}
