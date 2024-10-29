import { Router } from 'express'
import {
  deleteFavorite,
  getBookAll,
  getBookById,
  getFavoriteAll,
  saveFavorite
} from '../controllers/book.controllers.js'


const bookRoutes = Router()

bookRoutes.get('/', getBookAll)
bookRoutes.get('/favorites', getFavoriteAll)
bookRoutes.post('/favorites', saveFavorite)
bookRoutes.delete('/favorites', deleteFavorite)
bookRoutes.get('/:id', getBookById)

export default bookRoutes
