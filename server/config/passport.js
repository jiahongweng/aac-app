import passport from 'passport';
import httpStatus from 'http-status';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  Strategy as JWTstrategy,
  ExtractJwt as ExtractJWT,
} from 'passport-jwt';
import database from '../src/models';
import APIError from '../helpers/APIError';
import { ERROR_MESSAGES } from '../utils/constants';

const jwtSecret = process.env.JWT_SECRET;
const jwtOpts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    (req, email, password, done) => {
      const { firstName, lastName } = req.body;

      database.User.findOne({ where: { email } })
        .then((user) => {
          if (user) {
            return done(
              new APIError(
                ERROR_MESSAGES.EMAIL_ALREADY_TAKEN,
                httpStatus.BAD_REQUEST,
                true,
              ),
            );
          }

          return database.User.create({
            firstName,
            lastName,
            email,
            password,
          }).then((newUser) => done(null, newUser));
        })
        .catch((err) => done(err));
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      database.User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(
              new APIError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                httpStatus.UNAUTHORIZED,
                true,
              ),
            );
          }

          if (!user.isValidPassword(password)) {
            return done(
              new APIError(
                ERROR_MESSAGES.INVALID_PASSWORD,
                httpStatus.FORBIDDEN,
                true,
              ),
            );
          }

          return done(null, user);
        })
        .catch((err) => done(err));
    },
  ),
);

passport.use(
  'jwt',
  new JWTstrategy(jwtOpts, (jwtPayload, done) => {
    database.User.findByPk(jwtPayload._id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch((err) => done(err));
  }),
);
