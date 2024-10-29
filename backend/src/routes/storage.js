import { Router } from 'express'
import { listStorageFiles, streamEpub } from '../controllers/firebase-controllers.js'


const router = Router()

router.get('/storage/files', listStorageFiles)
router.get('/storage/epub/:fileName', streamEpub)

export default router
