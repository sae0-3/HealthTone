import passport from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { getUserById } from '../models/user.models.js'
import 'dotenv/config'


const cookieExtractor = (req) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['token']
  }

  return token
}

passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.KEY_JWT,
}, async (payload, done) => {
  try {
    const user = await getUserById(payload.id)
    return user ? done(null, user) : done(null, false)
  } catch (err) {
    return done(err, false)
  }
}))

export default passport
