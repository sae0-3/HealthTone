import express from 'express';
import { saveProgress } from '../controllers/progressController.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Manejar solicitudes POST para guardar el progreso
router.post('/progreso', saveProgress);

export default router;

