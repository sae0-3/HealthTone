import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { getUserById } from '../models/user.models.js'
import 'dotenv/config'


passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
