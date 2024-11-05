import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import passport from './config/passport.js'
import storageRoutes from './routes/storage.js'
import authRoutes from './routes/v0/auth.routes.js'
import bookRoutes from './routes/v0/book.routes.js'
import {
  authRoutes as authRoutesV1,
  bookRoutes as bookRoutesV1,
  userRoutes as userRoutesV1,
} from './routes/v1/index.js'


const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())
app.use('/api', storageRoutes)

app.use('/api/auth', authRoutes)
app.use('/api/books', passport.authenticate('jwt', { session: false }), bookRoutes)

app.use('/api/v1/auth', authRoutesV1)
app.use('/api/v1/books', bookRoutesV1)
app.use('/api/v1/users', userRoutesV1)

app.listen(PORT, () => {
  console.log(`El servidor se esta ejecutando en el puerto ${PORT}`)
})
