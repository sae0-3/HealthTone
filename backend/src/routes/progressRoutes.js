import express from 'express';
import { saveProgress } from '../controllers/progressController.js';

const router = express.Router();


router.all('/progreso', (req, res) => {
    res.send(`Recibida una solicitud ${req.method}.`);
  });
  
export default router;
