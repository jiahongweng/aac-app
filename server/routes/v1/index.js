import express from 'express';
import passport from 'passport';
import authRoutes from './AuthRoutes';
import userRoutes from './UserRoutes';
import organizationRoutes from './OrganizationRoutes';

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

/**
 * Organizations
 */
router.use(
  '/organizations',
  passport.authenticate('jwt', { session: false }),
  organizationRoutes,
);

export default router;
