import express from 'express';
import {streamEpub, listStorageFiles} from '../controllers/firebase-controllers.js'
const router = express.Router();

// Listar todos los archivos EPUB
router.get('/storage/files', listStorageFiles);

// Stream directo del EPUB
router.get('/storage/epub/:fileName', streamEpub);

export default router;