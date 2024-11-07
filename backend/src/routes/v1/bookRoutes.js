import { Router } from 'express'
import passport from '../../config/passport.js'
import {
  deleteFavorite,
  getBookAll,
  getBookById,
  getFavorites,
  getProgress,
  postBookView,
  postFavorite,
  postProgress,
} from '../../controllers/v1/index.js'


const bookRoutes = Router()

bookRoutes.get('/', getBookAll)
bookRoutes.get('/favorites', passport.authenticate('jwt', { session: false }), getFavorites)
bookRoutes.post('/favorites/:id', passport.authenticate('jwt', { session: false }), postFavorite)
bookRoutes.delete('/favorites/:id', passport.authenticate('jwt', { session: false }), deleteFavorite)
bookRoutes.get('/progress', passport.authenticate('jwt', { session: false }), getProgress)
bookRoutes.post('/progress', passport.authenticate('jwt', { session: false }), postProgress)
bookRoutes.post('/:id', passport.authenticate('jwt', { session: false }), postBookView)
bookRoutes.get('/:id', getBookById)

export default bookRoutes
