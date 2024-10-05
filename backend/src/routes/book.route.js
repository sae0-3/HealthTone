import { Router } from 'express'
import { getBookById, getBookAll } from '../controllers/book.controller.js'


const bookRouter = Router()

bookRouter.get('/:id', getBookById)
bookRouter.get('/', getBookAll)

export default bookRouter
