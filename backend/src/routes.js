import { Router } from 'express'
import { getBookById, getBookAll } from './controllers.js'


const bookRouter = Router()

bookRouter.get('/:id', getBookById)
bookRouter.get('/', getBookAll)

export default bookRouter
