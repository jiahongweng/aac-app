import { Router } from 'express';
import OrderController from '../../controllers/OrderController';
import { checkOrderOwnership } from '../../middlewares/permission.middleware';

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

export default router;
