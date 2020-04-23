/* eslint-disable consistent-return */
import httpStatus from 'http-status';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userWithoutPassword } from '../utils/misc';

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

    req.logIn(user, { session: false }, (error) => {
      if (error) {
        return next(error);
      }

      const token = jwt.sign({ _id: user.id }, jwtSecret);
      return res
        .status(httpStatus.CREATED)
        .json({ token, user: userWithoutPassword(user) });
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

    req.logIn(user, { session: false }, (error) => {
      if (error) {
        return next(error);
      }

      const token = jwt.sign({ _id: user.id }, jwtSecret);
      return res
        .status(httpStatus.OK)
        .json({ token, user: userWithoutPassword(user) });
    });
  })(req, res, next);
};
