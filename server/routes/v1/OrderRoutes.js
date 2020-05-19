import { Router } from 'express';
import OrderController from '../../controllers/OrderController';
import { checkRole } from '../../middlewares/permission.middleware';
import { ROLES } from '../../utils/constants';

const router = Router();

router
  .route('/')
  .get(checkRole([ROLES.ADMIN]), OrderController.getAllOrders)
  .post(checkRole([ROLES.ADMIN]), OrderController.createOrder);

router
  .route('/:orderId')
  .get(checkRole([ROLES.ADMIN]), OrderController.getOrder);
//   .put(checkRole([ROLES.ADMIN]), OrderController.updateOrganization)
//   .delete(checkRole([ROLES.ADMIN]), OrderController.deleteOrganization);

export default router;
