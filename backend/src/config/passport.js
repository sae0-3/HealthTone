import bcrypt from 'bcryptjs'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { getUserByEmail, getUserById } from '../models/user.models.js'


passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await getUserByEmail(email)
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' })
      }

      const isMatch = await bcrypt.compare(password, user.clave)
      return isMatch
        ? done(null, user)
        : done(null, false, { message: 'Contraseña incorrecta' })
    } catch (error) {
      return done(error)
    }
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

export default passport
