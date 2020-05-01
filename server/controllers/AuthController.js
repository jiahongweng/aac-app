/* eslint-disable consistent-return */
import httpStatus from 'http-status';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import UserService from '../services/UserService';
import EmailService from '../services/EmailService';
import { userWithoutPassword } from '../utils/misc';
import APIError from '../helpers/APIError';
import { STATUSES, ERROR_MESSAGES } from '../utils/constants';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

/**
 * Register user
 * @public
 */
exports.register = (req, res, next) => {
  passport.authenticate('register', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    // Generate 20 bit activation code, ‘crypto’ is nodejs built in package.
    crypto.randomBytes(20, async (error, buf) => {
      if (err) {
        return next(err);
      }
      // Ensure the activation code is unique.
      user.verificationCode = `${user.id}${buf.toString('hex')}`; // eslint-disable-line no-param-reassign

      // Sending activation email
      EmailService.sendActivationEmail({
        username: user.firstName,
        to: user.email,
        code: user.verificationCode,
      });

      await user.save();

      return res.status(httpStatus.CREATED).json({
        success: true,
      });
    });
  })(req, res, next);
};

/**
 * Login user
 * @public
 */
exports.login = (req, res, next) => {
  passport.authenticate('login', (err, user) => {
    if (err) {
      return next(err);
    }

    req.logIn(user, { session: false }, async (error) => {
      if (error) {
        return next(error);
      }

      const token = jwt.sign({ _id: user.id }, jwtSecret);
      return res.status(httpStatus.OK).json({
        token,
        user: userWithoutPassword(await UserService.getUser(user.id)),
      });
    });
  })(req, res, next);
};

/**
 * Activate user
 * @public
 */
exports.activateAccount = async (req, res, next) => {
  const { verificationCode } = req.params;

  try {
    const user = await UserService.getUserBy({ verificationCode });

    if (!user) {
      return next(
        new APIError(ERROR_MESSAGES.USER_NOT_FOUND, httpStatus.NOT_FOUND, true),
      );
    }

    if (user.verificationCode !== verificationCode) {
      return next(
        new APIError(
          ERROR_MESSAGES.INVALID_VERIFICATION_CODE,
          httpStatus.FORBIDDEN,
          true,
        ),
      );
    }

    user.verificationCode = null;
    user.status = STATUSES.ACTIVE;
    await user.save();

    return res.status(httpStatus.CREATED).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
