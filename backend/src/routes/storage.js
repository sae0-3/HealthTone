import { Router } from 'express'
import { listStorageFiles, streamEpub } from '../controllers/firebase-controllers.js'


const storageRoutes = Router()

storageRoutes.get('/storage/files', listStorageFiles)
storageRoutes.get('/storage/epub/:fileName', streamEpub)

export default storageRoutes
