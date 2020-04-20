import express from 'express';
import userRoutes from './UserRoutes';

const router = express.Router();

/**
 * API status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * Users
 */
router.use('/users', userRoutes);

export default router;
