import * as Yup from 'yup';
import { omit, isEmpty } from 'lodash';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const SS_ACTIVEWARE = {
  API_BASE: 'https://api.ssactivewear.com/v2',
  CDN_BASE: 'https://cdn.ssactivewear.com',
};

export const ROLES = {
  ADMIN: 2,
  CLIENT: 1,
};

export const STATUSES = {
  ACTIVE: 1,
  INACTIVE: 0,
};

export const ACTIONS = {
  NONE: '',
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
};

const authShape = {
  email: Yup.string()
    .email('Invalid email address')
    .required('Please enter your email address'),
  password: Yup.string()
    .min(3, 'Password must be longer than 3 characters')
    .max(20, 'Password must be shorter than 20 characters')
    .required('Please enter your password'),
};
const profileShape = {
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
};
const resetPasswordShape = {
  password: Yup.string()
    .required('Please enter your new password')
    .min(3, 'Password must be longer than 3 characters')
    .max(20, 'Password must be shorter than 20 characters'),
  confirmPassword: Yup.string()
    .required('Please enter your confirm password')
    .min(3, 'Password must be longer than 3 characters')
    .max(20, 'Password must be shorter than 20 characters')
    .oneOf([Yup.ref('password'), null], 'Password does not match'),
};
const accountPasswordShape = {
  oldPassword: Yup.string()
    .min(3, 'Password must be longer than 3 characters')
    .max(20, 'Password must be shorter than 20 characters')
    .when(['password', 'confirmPassword'], {
      is: (password, confirmPassword) =>
        !isEmpty(password) || !isEmpty(confirmPassword),
      then: Yup.string().required('Please enter your current password'),
    }),
  password: Yup.string()
    .min(3, 'Password must be longer than 3 characters')
    .max(20, 'Password must be shorter than 20 characters')
    .when(['oldPassword', 'confirmPassword'], {
      is: (oldPassword, confirmPassword) =>
        !isEmpty(oldPassword) || !isEmpty(confirmPassword),
      then: Yup.string().required('Please enter your new password'),
    }),
  confirmPassword: Yup.string()
    .min(3, 'Password must be longer than 3 characters')
    .max(20, 'Password must be shorter than 20 characters')
    .when(['password', 'oldPassword'], {
      is: (password, oldPassword) =>
        !isEmpty(password) || !isEmpty(oldPassword),
      then: Yup.string()
        .required('Please enter your confirm password')
        .oneOf([Yup.ref('password'), null], 'Password does not match'),
    }),
};
const addressShape = {
  address1: Yup.string().required('Please enter the address line'),
  city: Yup.string().required('Please enter the city'),
  state: Yup.string().required('Please enter the state'),
  zipCode: Yup.string().required('Please enter the zip code'),
};
export const LOGIN_SCHEMA = Yup.object().shape(authShape);
export const REGISTER_SCHEMA = Yup.object().shape({
  ...profileShape,
  ...authShape,
});
export const FORGOT_PASSWORD_SCHEMA = Yup.object().shape({
  email: authShape.email,
});
export const RESET_PASSWORD_SCHEMA = Yup.object().shape(resetPasswordShape);
export const ACCOUNT_SCHEMA = Yup.object().shape(
  {
    ...profileShape,
    ...accountPasswordShape,
  },
  [
    ['password', 'confirmPassword'],
    ['password', 'oldPassword'],
    ['oldPassword', 'confirmPassword'],
  ],
);
export const USER_SCHEMA = (action) =>
  Yup.object().shape({
    ...(action === ACTIONS.CREATE ? authShape : omit(authShape, ['password'])),
    ...profileShape,
  });
export const ORGANIZATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Plaese enter the name'),
  location: Yup.object().shape({
    ...addressShape,
  }),
  shippingAddress: Yup.object().shape({
    ...addressShape,
  }),
});

export const ERROR_MESSAGES = {
  NOT_FOUND_PAGE_TITILE: 'Ooops... looks like an error occurred!',
  NOT_FOUND_PAGE_CONTENT:
    'Not found what you wanted to see. Try different route.',
};

export const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS:
    'Registered successfully. Please check your email to confirm.',
  ACTIVATION_SUCCESS:
    'Your account is activated successfully. Please login with your email.',
  FORGOT_PASSWORD_SUCCESS:
    'Password recovery email sent. Please check your email.',
  RESET_PASSWORD_SUCCESS:
    'Your password has been successfully reset, please try logging in again.',
  UPDATE_ACCOUNT_SUCCESS: 'User account updated successfully.',
  UPDATE_ORGANIZATION_SUCCESS: 'Orgamization saved successfully.',
  CREATE_USER_SUCCESS: 'User created successfully.',
  UPDATE_USER_SUCCESS: 'User updated successfully.',
  DELETE_USERS_SUCCESS: 'User(s) deleted successfully.',
};

export const API_BASE = process.env.REACT_APP_API_SERVER_URL;
