import express from 'express';
import { updateUserClave } from '../../controllers/v0/user.controller.js';

const router = express.Router();

router.put('/update-clave', updateUserClave);

export default router;
