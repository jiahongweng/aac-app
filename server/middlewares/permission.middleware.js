import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import OrderService from '../services/OrderService';
import { ROLES, ERROR_MESSAGES } from '../utils/constants';

/**
 * Check if current user has any of specified roles
 * @public
 */
export const checkRole = (roles) => (req, res, next) => {
  const currentUser = req.user;

  if (roles.includes(currentUser.role)) {
    return next();
  }

  return next(
    new APIError(
      ERROR_MESSAGES.USER_ROLE_NOT_ALLOWED,
      httpStatus.FORBIDDEN,
      true,
    ),
  );
};

/**
 * Check if current user is trying to do operation on himself or is the admin
 * @public
 */
export const checkSelfOrAdmin = (req, res, next) => {
  const currentUser = req.user;
  const { id: resourceId } = req.params;

  if (
    currentUser.role === ROLES.ADMIN ||
    resourceId === currentUser.id.toString()
  ) {
    return next();
  }

  return next(
    new APIError(ERROR_MESSAGES.USER_NOT_ALLOWED, httpStatus.FORBIDDEN, true),
  );
};

/**
 * Check if the current user is the owner of the order or is the admin
 * @public
 */
export const checkOrderOwnership = async (req, res, next) => {
  const currentUser = req.user;
  const { orderId } = req.params;

  const order = await OrderService.getOrder(orderId);

  if (!order) {
    return next(
      new APIError(
        ERROR_MESSAGES.ORDER_NOT_FOUND_WITH_ID(orderId),
        httpStatus.NOT_FOUND,
        true,
      ),
    );
  }

  if (order.user.id === currentUser.id || currentUser.role === ROLES.ADMIN) {
    return next();
  }

  return next(
    new APIError(ERROR_MESSAGES.USER_NOT_ALLOWED, httpStatus.FORBIDDEN, true),
  );
};
