import { Router } from 'express';
import UserController from '../../controllers/UserController';
import {
  checkRole,
  checkSelfOrAdmin,
} from '../../middlewares/permission.middleware';
import { ROLES } from '../../utils/constants';

const router = Router();

router
  .route('/')
  .get(checkRole([ROLES.ADMIN]), UserController.getAllUsers)
  .post(checkRole([ROLES.ADMIN]), UserController.addUser);

router
  .route('/:id')
  .get(checkSelfOrAdmin, UserController.getUser)
  .put(checkSelfOrAdmin, UserController.updateUser)
  .delete(checkSelfOrAdmin, UserController.deleteUser);

export default router;
