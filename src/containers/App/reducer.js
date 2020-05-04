import {
  getTokenInStorage,
  getUserInStorage,
  saveTokenInStorage,
  saveUserInStorage,
  deleteTokenInStorage,
  deleteUserInStorage,
} from 'utils/auth';

import {
  AUTH_TOKEN_ERROR,
  LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  ACTIVATE_ACCOUNT,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_ERROR,
} from './constants';

const initialState = {
  isAuthenticated: !!getTokenInStorage(),
  currentUser: {
    loading: null,
    error: null,
    data: getUserInStorage(),
  },
};

function appReducer(state = initialState, action) {
  const { error, token, user } = action.payload || {};

  switch (action.type) {
    case AUTH_TOKEN_ERROR:
    case LOGOUT:
      deleteTokenInStorage();
      deleteUserInStorage();

      return {
        ...state,
        isAuthenticated: false,
        currentUser: {
          loading: null,
          error: null,
          data: null,
        },
      };
    case REGISTER:
    case LOGIN:
    case ACTIVATE_ACCOUNT:
    case FORGOT_PASSWORD:
    case RESET_PASSWORD:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {
          loading: true,
          error: false,
          data: false,
        },
      };
    case REGISTER_SUCCESS:
    case ACTIVATE_ACCOUNT_SUCCESS:
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {
          loading: false,
          error: false,
          data: false,
        },
      };
    case LOGIN_SUCCESS:
      saveTokenInStorage(token);
      saveUserInStorage(user);

      return {
        ...state,
        isAuthenticated: true,
        currentUser: {
          loading: false,
          error: false,
          data: user,
        },
      };
    case REGISTER_ERROR:
    case LOGIN_ERROR:
    case ACTIVATE_ACCOUNT_ERROR:
    case FORGOT_PASSWORD_ERROR:
    case RESET_PASSWORD_ERROR:
      deleteTokenInStorage();
      deleteUserInStorage();

      return {
        ...state,
        isAuthenticated: false,
        currentUser: {
          loading: false,
          error,
          data: false,
        },
      };
    case UPDATE_ACCOUNT:
    case UPDATE_ORGANIZATION:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: true,
          error: false,
        },
      };
    case UPDATE_ACCOUNT_SUCCESS:
    case UPDATE_ORGANIZATION_SUCCESS:
      saveUserInStorage(user);

      return {
        ...state,
        currentUser: {
          loading: false,
          error: false,
          data: user,
        },
      };
    case UPDATE_ACCOUNT_ERROR:
    case UPDATE_ORGANIZATION_ERROR:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
          error,
        },
      };
    default:
      return state;
  }
}

export default appReducer;
