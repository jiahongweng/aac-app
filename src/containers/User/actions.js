import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from './constants';

/**
 * Fetch user, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_USER
 */
export function fetchUser({ id }) {
  return {
    type: FETCH_USER,
    payload: { id },
  };
}

/**
 * Dispatched when the user is fetched by the request saga
 *
 * @param  {object} user user info
 *
 * @return {object} An action object with a type of FETCH_USER_SUCCESS passing the user
 */
export function fetchUserSucceeded({ data }) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: { data },
  };
}

/**
 * Dispatched when fetching user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_USER_ERROR passing the error
 */
export function fetchUserFailed(error) {
  return {
    type: FETCH_USER_ERROR,
    payload: { error },
  };
}

/**
 * Create user, this action starts the request saga
 *
 * @return {object} An action object with a type of CREATE_USER
 */
export function createUser({
  email,
  password,
  firstName,
  lastName,
  phone,
  role,
  status,
}) {
  return {
    type: CREATE_USER,
    payload: { email, password, firstName, lastName, phone, role, status },
  };
}

/**
 * Dispatched when the user is created by the request saga
 *
 * @param  {object} user created user info
 *
 * @return {object} An action object with a type of CREATE_USER_SUCCESS passing the user
 */
export function createUserSucceeded({ data }) {
  return {
    type: CREATE_USER_SUCCESS,
    payload: { data },
  };
}

/**
 * Dispatched when creating user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CREATE_USER_ERROR passing the error
 */
export function createUserFailed(error) {
  return {
    type: CREATE_USER_ERROR,
    payload: { error },
  };
}

/**
 * Update user, this action starts the request saga
 *
 * @return {object} An action object with a type of UPDATE_USER
 */
export function updateUser({
  id,
  email,
  password,
  firstName,
  lastName,
  phone,
  role,
  status,
}) {
  return {
    type: UPDATE_USER,
    payload: {
      id,
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
      status,
    },
  };
}

/**
 * Dispatched when the user is updated by the request saga
 *
 * @param  {object} user updated user info
 *
 * @return {object} An action object with a type of UPDATE_USER_SUCCESS passing the user
 */
export function updateUserSucceeded({ data }) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: { data },
  };
}

/**
 * Dispatched when updating user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of UPDATE_USER_ERROR passing the error
 */
export function updateUserFailed(error) {
  return {
    type: UPDATE_USER_ERROR,
    payload: { error },
  };
}
