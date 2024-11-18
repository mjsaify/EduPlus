import { Router } from 'express';
import { UpdateUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/update', UpdateUser);

export default router;