import cors from 'cors'
import exprees from 'express'
import bookRoutes from './routes/book.routes.js'


const app = exprees()
const PORT = 4000

app.use(cors())
app.use(exprees.json())

app.use('/api/book', bookRoutes)

app.listen(PORT, () => {
  console.log(`El servidor se esta ejecutando en el puerto ${PORT}`)
})
