import { Router } from 'express';
import userRouter from './user.routes.js';
import { UserLogin, UserSignup } from '../controllers/user.controller.js';

const router = Router();

// Protected routes
router.use('/user', userRouter);


// Public Routes
router.post('/auth/signup', UserSignup);
router.post('/auth/login', UserLogin);


export default router;