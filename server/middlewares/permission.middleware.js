import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
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
