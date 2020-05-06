/* eslint-disable consistent-return */
import httpStatus from 'http-status';
import { Op } from 'sequelize';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import UserService from '../services/UserService';
import EmailService from '../services/EmailService';
import APIError from '../helpers/APIError';
import {
  STATUSES,
  ERROR_MESSAGES,
  RESET_PASSWORD_EXPIRES,
} from '../utils/constants';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const googleOauth2Client = new OAuth2Client(googleClientId);

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
      if (error) {
        return next(error);
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
        user: await UserService.getUser(user.id),
      });
    });
  })(req, res, next);
};

/**
 * Googe register / login
 * @public
 */
exports.google = async (req, res, next) => {
  const { mode, idToken } = req.body;

  if (!(mode === 'register' || mode === 'login')) {
    return next(
      new APIError(
        ERROR_MESSAGES.INCOMPLETE_REQUEST,
        httpStatus.BAD_REQUEST,
        true,
      ),
    );
  }

  try {
    const ticket = await googleOauth2Client.verifyIdToken({
      idToken,
      audience: googleClientId,
    });
    const {
      sub: googleId,
      email,
      given_name: firstName,
      family_name: lastName,
    } = ticket.getPayload();
    const user = await UserService.getUserBy({ googleId, email });

    if (mode === 'register') {
      if (user) {
        return next(
          new APIError(
            ERROR_MESSAGES.EMAIL_ALREADY_TAKEN,
            httpStatus.BAD_REQUEST,
            true,
          ),
        );
      }

      try {
        const createdUser = await UserService.addUser({
          email,
          firstName,
          lastName,
          googleId,
          password: '', // Set empty password for now
          status: 1, // Set as active user since it is authenticated using google
        });

        // User login after google authentication
        const token = jwt.sign({ _id: createdUser.id }, jwtSecret);
        return res.status(httpStatus.OK).json({
          token,
          user: createdUser,
        });
      } catch (error) {
        return next(error);
      }
    }

    if (mode === 'login') {
      if (!user) {
        return next(
          new APIError(
            ERROR_MESSAGES.USER_NOT_FOUND,
            httpStatus.UNAUTHORIZED,
            true,
          ),
        );
      }

      req.logIn(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }

        const token = jwt.sign({ _id: user.id }, jwtSecret);
        return res.status(httpStatus.OK).json({
          token,
          user: await UserService.getUser(user.id),
        });
      });
    }
  } catch (error) {
    return next(error);
  }
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

    return res.status(httpStatus.OK).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Forgot Password
 * @public
 */
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await UserService.getUserBy({ email });

    if (!user) {
      return next(
        new APIError(ERROR_MESSAGES.USER_NOT_FOUND, httpStatus.NOT_FOUND, true),
      );
    }

    // Generate 20 bit reset password token
    crypto.randomBytes(20, async (error, buf) => {
      if (error) {
        return next(error);
      }
      // Ensure the reset password token is unique.
      user.resetPasswordToken = `${user.id}${buf.toString('hex')}`; // eslint-disable-line no-param-reassign
      user.resetPasswordExpires = Date.now() + RESET_PASSWORD_EXPIRES;

      // Sending  email
      EmailService.sendResetPasswordEmail({
        username: user.firstName,
        to: user.email,
        token: user.resetPasswordToken,
      });

      await user.save();

      return res.status(httpStatus.OK).json({
        success: true,
      });
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Reset password
 * @public
 */
exports.resetPassword = async (req, res, next) => {
  const { token: resetPasswordToken } = req.params;
  const { password } = req.body;

  try {
    const user = await UserService.getUserBy({
      resetPasswordToken,
      resetPasswordExpires: { [Op.gt]: Date.now() },
    });

    if (!user) {
      return next(
        new APIError(
          ERROR_MESSAGES.INVALID_RESET_PASSWORD,
          httpStatus.NOT_FOUND,
          true,
        ),
      );
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.status(httpStatus.OK).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
