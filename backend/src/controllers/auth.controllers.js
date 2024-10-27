import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getUserByEmail, registerUser } from '../models/user.models.js'


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

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return res.status(401).send({ error: 'Usuario no encontrado' })
    }

    const isMatch = await bcrypt.compare(password, user.clave)
    if (!isMatch) {
      return res.status(401).send({ error: 'Contraseña incorrecta' })
    }

    const token = jwt.sign({ id: user.id }, process.env.KEY_JWT, { expiresIn: '7d' })

    res.cookie('token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({ message: 'Login exitoso' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Error en el proceso de inicio de sesión' })
  }
}

const logout = async (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logout exitoso' })
}

export { login, logout, register }
