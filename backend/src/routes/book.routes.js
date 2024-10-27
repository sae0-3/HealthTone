import { Router } from 'express'
import { getBookById, getBookAll } from '../controllers/book.controllers.js'


const bookRoutes = Router()

bookRoutes.get('/:id', getBookById)
bookRoutes.get('/', getBookAll)

export default bookRoutes
