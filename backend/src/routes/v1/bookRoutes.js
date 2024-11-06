import { Router } from 'express'
import passport from '../../config/passport.js'
import {
  deleteFavorite,
  getBookAll,
  getBookById,
  getFavorites,
  postBookView,
  postFavorite,
} from '../../controllers/v1/index.js'


const bookRoutes = Router()

bookRoutes.get('/', getBookAll)
bookRoutes.get('/favorites', passport.authenticate('jwt', { session: false }), getFavorites)
bookRoutes.post('/favorites/:id', passport.authenticate('jwt', { session: false }), postFavorite)
bookRoutes.delete('/favorites/:id', passport.authenticate('jwt', { session: false }), deleteFavorite)
bookRoutes.get('/:id', getBookById)
bookRoutes.post('/:id', passport.authenticate('jwt', { session: false }), postBookView)

export default bookRoutes
