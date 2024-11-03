// import cookieParser from 'cookie-parser'
import cors from 'cors'
import exprees from 'express'
import passport from './config/passport.js'
import authRoutes from './routes/auth.routes.js'
import bookRoutes from './routes/book.routes.js'
import 'dotenv/config'
import storageRoutes from './routes/storage.js';


const app = exprees()
const PORT = 4000

app.use(cors())

app.use(exprees.json())
// app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/books', passport.authenticate('jwt', { session: false }), bookRoutes)
app.use('/api', storageRoutes); 

app.listen(PORT, () => {
  console.log(`El servidor se esta ejecutando en el puerto ${PORT}`)
})
