import {
  AUTH_TOKEN_ERROR,
  LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GOOGLE_REGISTER,
  GOOGLE_LOGIN,
  ACTIVATE_ACCOUNT,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './constants';

/**
 * Dispatched when auth token is invalid
 *
 * @return {object} An action object with a type of AUTH_TOKEN_ERROR
 */
export function authTokenFailed() {
  return {
    type: AUTH_TOKEN_ERROR,
    payload: {},
  };
}

/**
 * Dispatched when logging out
 *
 * @return {object} An action object with a type of LOGOUT
 */
export function logout() {
  return {
    type: LOGOUT,
    payload: {},
  };
}

/**
 * Register user, this action starts the request saga
 *
 * @return {object} An action object with a type of REGISTER
 */
export function register({ firstName, lastName, email, password }) {
  return {
    type: REGISTER,
    payload: {
      firstName,
      lastName,
      email,
      password,
    },
  };
}

/**
 * Dispatched when the user is registered by the request saga
 *
 * @return {object} An action object with a type of REGISTER_SUCCESS passing the empty object
 */
export function registerSucceeded() {
  return {
    type: REGISTER_SUCCESS,
    payload: {},
  };
}

/**
 * Dispatched when registering user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of REGISTER_ERROR passing the error
 */
export function registerFailed(error) {
  return {
    type: REGISTER_ERROR,
    payload: { error },
  };
}

/**
 * Login user, this action starts the request saga
 *
 * @return {object} An action object with a type of LOGIN
 */
export function login({ email, password }) {
  return {
    type: LOGIN,
    payload: {
      email,
      password,
    },
  };
}

/**
 * Dispatched when the user is logged in by the request saga
 *
 * @param  {object} user user info
 *
 * @return {object} An action object with a type of LOGIN_SUCCESS passing the user
 */
export function loginSucceeded({ token, user }) {
  return {
    type: LOGIN_SUCCESS,
    payload: { token, user },
  };
}

/**
 * Dispatched when logging in user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOGIN_ERROR passing the error
 */
export function loginFailed(error) {
  return {
    type: LOGIN_ERROR,
    payload: { error },
  };
}

/**
 * Google register user, this action starts the request saga
 *
 * @return {object} An action object with a type of GOOGLE_REGISTER
 */
export function googleRegister({ idToken }) {
  return {
    type: GOOGLE_REGISTER,
    payload: {
      idToken,
    },
  };
}

/**
 * Google login user, this action starts the request saga
 *
 * @return {object} An action object with a type of GOOGLE_LOGIN
 */
export function googleLogin({ idToken }) {
  return {
    type: GOOGLE_LOGIN,
    payload: {
      idToken,
    },
  };
}

/**
 * Activate user, this action starts the request saga
 *
 * @return {object} An action object with a type of ACTIVATE_ACCOUNT
 */
export function activateAccount({ verificationCode }) {
  return {
    type: ACTIVATE_ACCOUNT,
    payload: { verificationCode },
  };
}

/**
 * Dispatched when the user is activated in by the request saga
 *
 * @return {object} An action object with a type of ACTIVATE_ACCOUNT_SUCCESS passing the empty object
 */
export function activateAccountSucceeded() {
  return {
    type: ACTIVATE_ACCOUNT_SUCCESS,
    payload: {},
  };
}

/**
 * Dispatched when activation in user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of ACTIVATE_ACCOUNT_ERROR passing the error
 */
export function activateAccountFailed(error) {
  return {
    type: ACTIVATE_ACCOUNT_ERROR,
    payload: { error },
  };
}

/**
 * Forgot password, this action starts the request saga
 *
 * @return {object} An action object with a type of FORGOT_PASSWORD
 */
export function forgotPassword({ email }) {
  return {
    type: FORGOT_PASSWORD,
    payload: { email },
  };
}

/**
 * Dispatched when the user has sent forgot password request in by the request saga
 *
 * @return {object} An action object with a type of FORGOT_PASSWORD_SUCCESS passing the empty object
 */
export function forgotPasswordSucceeded() {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: {},
  };
}

/**
 * Dispatched when forgot password in user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FORGOT_PASSWORD_ERROR passing the error
 */
export function forgotPasswordFailed(error) {
  return {
    type: FORGOT_PASSWORD_ERROR,
    payload: { error },
  };
}

/**
 * Rest password, this action starts the request saga
 *
 * @return {object} An action object with a type of RESET_PASSWORD
 */
export function resetPassword({ token, password }) {
  return {
    type: RESET_PASSWORD,
    payload: { token, password },
  };
}

/**
 * Dispatched when the user reset password in by the request saga
 *
 * @return {object} An action object with a type of RESET_PASSWORD_SUCCESS passing the empty object
 */
export function resetPasswordSucceeded() {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: {},
  };
}

/**
 * Dispatched when forgot password in user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of RESET_PASSWORD_ERROR passing the error
 */
export function resetPasswordFailed(error) {
  return {
    type: RESET_PASSWORD_ERROR,
    payload: { error },
  };
}

/**
 * Update account, this action starts the request saga
 *
 * @return {object} An action object with a type of UPDATE_ACCOUNT
 */
export function updateAccount({
  id,
  firstName,
  lastName,
  phone,
  password,
  oldPassword,
}) {
  return {
    type: UPDATE_ACCOUNT,
    payload: {
      id,
      firstName,
      lastName,
      phone,
      password,
      oldPassword,
    },
  };
}

/**
 * Dispatched when the account is updated by the request saga
 *
 * @param  {object} user user info
 *
 * @return {object} An action object with a type of UPDATE_ACCOUNT_SUCCESS passing the user
 */
export function updateAccountSucceeded({ data }) {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    payload: { user: data },
  };
}

/**
 * Dispatched when updating account fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of UPDATE_ACCOUNT_ERROR passing the error
 */
export function updateAccountFailed(error) {
  return {
    type: UPDATE_ACCOUNT_ERROR,
    payload: { error },
  };
}

/**
 * Update organization, this action starts the request saga
 *
 * @return {object} An action object with a type of UPDATE_ORGANIZATION
 */
export function updateOrganization({ id, name, location, shippingAddress }) {
  return {
    type: UPDATE_ORGANIZATION,
    payload: {
      id,
      name,
      location,
      shippingAddress,
    },
  };
}

/**
 * Dispatched when the organization is updated by the request saga
 *
 * @param  {object} user user info
 *
 * @return {object} An action object with a type of UPDATE_ORGANIZATION_SUCCESS passing the user
 */
export function updateOrganizationSucceeded({ data }) {
  return {
    type: UPDATE_ORGANIZATION_SUCCESS,
    payload: { user: data },
  };
}

/**
 * Dispatched when updating organization fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of UPDATE_ORGANIZATION_ERROR passing the error
 */
export function updateOrganizationFailed(error) {
  return {
    type: UPDATE_ORGANIZATION_ERROR,
    payload: { error },
  };
}
