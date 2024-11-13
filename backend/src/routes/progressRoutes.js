import express from 'express';
import { saveProgress } from '../controllers/progressController.js';

const router = express.Router();


router.post('/progreso', saveProgress);

export default router;

