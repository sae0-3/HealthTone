import express from 'express';
import { saveProgress } from '../controllers/progressController.js';
import { getProgress } from '../controllers/progressController.js';


const router = express.Router();


router.post('/progreso', saveProgress);
router.get('/progreso', getProgress);

export default router;

