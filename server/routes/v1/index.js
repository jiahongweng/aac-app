import express from 'express';
import passport from 'passport';
import authRoutes from './AuthRoutes';
import userRoutes from './UserRoutes';
import organizationRoutes from './OrganizationRoutes';
import productRoutes from './ProductRoute';
import ssaRoutes from './SSARoute';

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

/**
 * Products
 */
router.use(
  '/products',
  passport.authenticate('jwt', { session: false }),
  productRoutes,
);

/**
 * S&S Activewear
 */
router.use('/ssa', passport.authenticate('jwt', { session: false }), ssaRoutes);

export default router;
