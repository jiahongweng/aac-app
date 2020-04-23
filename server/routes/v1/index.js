import express from 'express';
import passport from 'passport';
import authRoutes from './AuthRoutes';
import userRoutes from './UserRoutes';

const router = express.Router();

/**
 * API status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * Auth
 */
router.use('/auth', authRoutes);

/**
 * Users
 */
router.use(
  '/users',
  passport.authenticate('jwt', { session: false }),
  userRoutes,
);

export default router;
