import express from 'express';
import { login } from './auth-controller.js';

const router = express.Router();

// se define el POST para el login
router.post('/auth/login', login);

export default router;
