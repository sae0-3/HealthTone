import { Router } from 'express';
import { getProgressByUserAndContent, updateProgreso } from '../../controllers/v0/progress.controllers.js';

const progressRoutes = Router();

progressRoutes.get('/:id_usuario/:id_contenido', getProgressByUserAndContent);
progressRoutes.put('/', updateProgreso);

export default progressRoutes;

