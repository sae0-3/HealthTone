import express from 'express';
import { updateUserClave } from '../controllers/user.controller.js';

const router = express.Router();

router.put('/update-clave', updateUserClave);

export default router;
