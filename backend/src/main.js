import cors from 'cors'
import exprees from 'express'
import bookRouter from './routes.js'


const app = exprees()
const PORT = 4000

app.use(cors())
app.use(exprees.json())

app.use('/api/book', bookRouter)

app.listen(PORT, () => {
  console.log(`El servidor se esta ejecutando en el puerto ${PORT}`)
})
