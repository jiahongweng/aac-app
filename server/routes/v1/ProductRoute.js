import { Router } from 'express';
import ProductController from '../../controllers/ProductController';
import { checkRole } from '../../middlewares/permission.middleware';
import { ROLES } from '../../utils/constants';

const router = Router();

router
  .route('/')
  .get(ProductController.getAllProducts)
  .post(checkRole([ROLES.ADMIN]), ProductController.addProduct);

router
  .route('/:id')
  .get(checkRole([ROLES.ADMIN]), ProductController.getProduct)
  .put(checkRole([ROLES.ADMIN]), ProductController.updateProduct)
  .delete(checkRole([ROLES.ADMIN]), ProductController.deleteProduct);

router
  .route('/delete_by_style/:styleId')
  .delete(checkRole([ROLES.ADMIN]), ProductController.deleteProductByStyle);

export default router;
