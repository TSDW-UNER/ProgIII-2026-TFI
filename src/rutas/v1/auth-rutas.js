import express from 'express';
import AuthController from '../../auth/auth-controller.js'; 

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);

export default router;
