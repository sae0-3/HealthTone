import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import passport from './config/passport.js'
import storageRoutes from './routes/storage.js'
import authRoutes from './routes/v0/auth.routes.js'
import bookRoutes from './routes/v0/book.routes.js'


const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/books', passport.authenticate('jwt', { session: false }), bookRoutes)
app.use('/api', storageRoutes); 

app.listen(PORT, () => {
  console.log(`El servidor se esta ejecutando en el puerto ${PORT}`)
})
