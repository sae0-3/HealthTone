import { putUserProfile, getUserByEmail } from "../../models/v1/index.js"
import { MissingCredentialsError, EmailExistsError} from "../../utils/CustomError.js"

export const putUpdateProfile = async (req, res) => {
  const {actualEmail, email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero} = req.body
 
  try {
    if (!email) {
      throw new MissingCredentialsError()
    }
    
    const user = await getUserByEmail(email)
    if (user && actualEmail !== email) {
      throw new EmailExistsError()
    }

    await putUserProfile(actualEmail, email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero)
    res.status(201).send('datos de perfil cambiados correctamente')
  } catch (err) {
    console.error('CONTROLLER putUpdateProfile:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error al cambiar los datos de perfil.',
    })
  }
}
