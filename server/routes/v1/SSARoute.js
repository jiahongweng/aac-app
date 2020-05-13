import { Router } from 'express';
import SSAController from '../../controllers/SSAController';
import { checkRole } from '../../middlewares/permission.middleware';
import { ROLES } from '../../utils/constants';

const router = Router();

router
  .route('/styles')
  .get(checkRole([ROLES.ADMIN]), SSAController.getAllStyles);

router.get('/styles/:styleId/products', SSAController.getProductsByStyle);

router
  .route('/styles/sync')
  .get(checkRole([ROLES.ADMIN]), SSAController.syncAllSsaStyles);

export default router;
