import bcrypt from 'bcryptjs'
import { registerUser } from '../models/user.models.js'


const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
  return passwordRegex.test(password)
}


const register = async (req, res) => {
  const { name, lastname, email, password } = req.body

  if (!isValidPassword(password)) {
    return res.status(400).send({
      error: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 7)
    const newUser = { name, lastname, email, password: hashedPassword }
    await registerUser(newUser)
    res.status(201).send('Usuario registrado exitosamente')
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'No se logró registrar' })
  }
}


export { register }
