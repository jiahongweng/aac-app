import { Router } from 'express';
import OrganizationController from '../../controllers/OrganizationController';
import { checkRole } from '../../middlewares/permission.middleware';
import { ROLES } from '../../utils/constants';

const router = Router();

router
  .route('/')
  .get(checkRole([ROLES.ADMIN]), OrganizationController.getAllOrganizations)
  .post(checkRole([ROLES.ADMIN]), OrganizationController.addOrganization);

router
  .route('/:id')
  .get(checkRole([ROLES.ADMIN]), OrganizationController.getOrganization)
  .put(checkRole([ROLES.ADMIN]), OrganizationController.updateOrganization)
  .delete(checkRole([ROLES.ADMIN]), OrganizationController.deleteOrganization);

export default router;
