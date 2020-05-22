import { Router } from 'express';
import OrderController from '../../controllers/OrderController';
import { ROLES } from '../../utils/constants';
import {
  checkRole,
  checkOrderOwnership,
} from '../../middlewares/permission.middleware';

const router = Router();

router
  .route('/')
  .get(OrderController.getAllOrders)
  .post(OrderController.createOrder);

router
  .route('/:orderId')
  .get(checkOrderOwnership, OrderController.getOrder)
  .put(checkOrderOwnership, OrderController.updateOrder)
  .delete(checkOrderOwnership, OrderController.deleteOrder);

router
  .route('/:orderId/designs')
  .post(checkRole([ROLES.ADMIN]), OrderController.uploadOrderDesignFile)
  .delete(checkRole([ROLES.ADMIN]), OrderController.deleteOrderDesignFile);

export default router;
