import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import { ERROR_MESSAGES } from '../utils/constants';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
  if (!(err instanceof APIError)) {
    const apiError = new APIError(
      err.message,
      err.status,
      err.isPublic,
      err.errors,
    );
    return next(apiError);
  }
  return next(err);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new APIError(
    ERROR_MESSAGES.API_NOT_FOUND,
    httpStatus.NOT_FOUND,
    true,
  );

  return next(err);
};

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
// eslint-disable-next-line consistent-return
exports.handler = (err, req, res, next) => {
  // eslint-disable-line consistent-return
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    ...(env === 'development' ? { stack: err.stack } : {}),
    ...(err.errors ? { errors: err.errors } : {}),
  });
};
