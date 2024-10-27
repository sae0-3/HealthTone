import cors from 'cors'
import exprees from 'express'
import session from 'express-session'
import passport from './config/passport.js'
import authRoutes from './routes/auth.routes.js'
import bookRoutes from './routes/book.routes.js'


const app = exprees()
const PORT = 4000

app.use(cors())
app.use(exprees.json())

app.use(session({
  secret: 'key-healthtone-v1',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRoutes)
app.use('/api/book', bookRoutes)

app.listen(PORT, () => {
  console.log(`El servidor se esta ejecutando en el puerto ${PORT}`)
})
