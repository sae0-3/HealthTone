import { putUserProfile } from "../../models/v1/index.js"

export const putUpdateProfile = async (req, res) => {
  const {email, genero, nacimiento, pais, telefono} = req.body

  try {
    if (!email) {
      throw new MissingCredentialsError()
    }

    await putUserProfile(email, genero, nacimiento, pais, telefono)
    res.status(201).send('datos de perfil cambiados correctamente')
  } catch (err) {
    console.error('CONTROLLER putUpdateProfile:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error al cambiar los datos de perfil.',
    })
  }
}
