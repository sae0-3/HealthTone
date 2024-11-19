import { Router } from 'express'
import passport from '../../config/passport.js'
import {
  deleteFavorite,
  getBookAll,
  getBookById,
  getBooksByCategorie,
  getCategories,
  getComments,
  getFavorites,
  getProgress,
  postBookView,
  postComment,
  postFavorite,
  postProgress,
  postQualification,
} from '../../controllers/v1/index.js'


const bookRoutes = Router()

bookRoutes.get('/', getBookAll)
bookRoutes.get('/categories', getCategories)
bookRoutes.get('/categories/:id', getBooksByCategorie)
bookRoutes.get('/comments/:id', getComments)
bookRoutes.post('/comments', passport.authenticate('jwt', { session: false }), postComment)
bookRoutes.get('/favorites', passport.authenticate('jwt', { session: false }), getFavorites)
bookRoutes.post('/favorites/:id', passport.authenticate('jwt', { session: false }), postFavorite)
bookRoutes.delete('/favorites/:id', passport.authenticate('jwt', { session: false }), deleteFavorite)
bookRoutes.get('/progress', passport.authenticate('jwt', { session: false }), getProgress)
bookRoutes.post('/progress', passport.authenticate('jwt', { session: false }), postProgress)
bookRoutes.post('/qualification', passport.authenticate('jwt', { session: false }), postQualification)
bookRoutes.post('/:id', passport.authenticate('jwt', { session: false }), postBookView)
bookRoutes.get('/:id', getBookById)

export default bookRoutes
