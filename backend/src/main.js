import cors from 'cors'
import exprees from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import bookRouter from './routes.js'


const app = exprees()
const PORT = 4000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(exprees.json())

app.use('/api/book', bookRouter)

app.use('/uploads', exprees.static(path.join(__dirname, 'uploads')))


app.listen(PORT, () => {
  console.log(`El servidor se esta ejecutando en el puerto ${PORT}`)
})
