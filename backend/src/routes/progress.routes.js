import { Router } from 'express';
import { getProgressByUserAndContent } from '../controllers/progress.controllers.js';
import { updateProgreso } from '../controllers/progress.controllers.js';

const progressRoutes = Router();

progressRoutes.get('/:id_usuario/:id_contenido', getProgressByUserAndContent);
progressRoutes.put('/', updateProgreso);

export default progressRoutes;

