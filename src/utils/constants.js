export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

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
