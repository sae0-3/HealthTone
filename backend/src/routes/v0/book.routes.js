import { Router } from 'express'
import {
  deleteFavorite,
  getBookAll,
  getBookById,
  getFavoriteAll,
  postFavorite,
} from '../../controllers/v0/book.controllers.js'


const bookRoutes = Router()

bookRoutes.get('/', getBookAll)
bookRoutes.get('/favorites', getFavoriteAll)
bookRoutes.post('/favorites/:id', postFavorite)
bookRoutes.delete('/favorites/:id', deleteFavorite)
bookRoutes.get('/:id', getBookById)

export default bookRoutes
