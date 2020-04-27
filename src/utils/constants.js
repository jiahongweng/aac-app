import * as Yup from 'yup';
import { omit } from 'lodash';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

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
    .min(3, 'Value must be longer than 3 characters')
    .max(20, 'Value must be shorter than 20 characters')
    .required('Please enter your password'),
};
const profileShape = {
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
};
export const AUTH_SCHEMA = Yup.object().shape(authShape);
export const USER_SCHEMA = (action) =>
  Yup.object().shape({
    ...(action === ACTIONS.CREATE ? authShape : omit(authShape, ['password'])),
    ...profileShape,
  });

export const ERROR_MESSAGES = {
  NOT_FOUND_PAGE_TITILE: 'Ooops... looks like an error occurred!',
  NOT_FOUND_PAGE_CONTENT:
    'Not found what you wanted to see. Try different route.',
};

export const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: 'User registered successfully.',
  UPDATE_ACCOUNT_SUCCESS: 'User account updated successfully.',
  CREATE_USER_SUCCESS: 'User created successfully.',
  UPDATE_USER_SUCCESS: 'User updated successfully.',
  DELETE_USERS_SUCCESS: 'User(s) deleted successfully.',
};

export const API_BASE = process.env.REACT_APP_API_SERVER_URL;
