import exprees from 'express'
import cors from 'cors'
import bookRouter from './routes/book.route.js'


const app = exprees()
const PORT = 4000

app.use(cors())
app.use('/book', bookRouter)

app.listen(PORT, () => {
  console.log(`El servidor se esta ejecutando en el puerto ${PORT}`)
})
