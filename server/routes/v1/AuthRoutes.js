import { Router } from 'express';
import authController from '../../controllers/AuthController';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/activate/:verificationCode', authController.activateAccount);

export default router;
