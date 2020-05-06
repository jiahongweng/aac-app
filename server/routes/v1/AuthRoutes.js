import { Router } from 'express';
import authController from '../../controllers/AuthController';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google', authController.google);
router.get('/activate/:verificationCode', authController.activateAccount);
router.post('/forgot', authController.forgotPassword);
router.post('/reset/:token', authController.resetPassword);

export default router;
