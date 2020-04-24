import { toastr } from 'react-redux-toastr';
import { SUCCESS_MESSAGES } from 'utils/constants';
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_USERS,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
} from './constants';

/**
 * Fetch users, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_USERS
 */
export function fetchUsers({ order, orderBy, page, limit }) {
  return {
    type: FETCH_USERS,
    payload: { order, orderBy, page, limit },
  };
}

/**
 * Dispatched when the users are fetched by the request saga
 *
 * @param  {object} users users info
 *
 * @return {object} An action object with a type of FETCH_USERS_SUCCESS passing the users
 */
export function fetchUsersSucceeded({ data }) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: { result: data },
  };
}

/**
 * Dispatched when fetching users fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_USERS_ERROR passing the error
 */
export function fetchUsersFailed(error) {
  toastr.error(error.message);

  return {
    type: FETCH_USERS_ERROR,
    payload: { error },
  };
}

/**
 * Delete user, this action starts the request saga
 *
 * @return {object} An action object with a type of DELETE_USER
 */
export function deleteUser({ _id }) {
  return {
    type: DELETE_USER,
    payload: { _id },
  };
}

/**
 * Dispatched when the user is deleted by the request saga
 *
 * @param  {object} _id deletedId info
 *
 * @return {object} An action object with a type of DELETE_USER_SUCCESS passing the deletedId
 */
export function deleteUserSucceeded({ deletedId }) {
  toastr.success(SUCCESS_MESSAGES.DELETE_USERS_SUCCESS);

  return {
    type: DELETE_USER_SUCCESS,
    payload: { deletedId },
  };
}

/**
 * Dispatched when deleting user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of DELETE_USER_ERROR passing the error
 */
export function deleteUserFailed(error) {
  toastr.error(error.message);

  return {
    type: DELETE_USER_ERROR,
    payload: { error },
  };
}

/**
 * Delete users, this action starts the request saga
 *
 * @return {object} An action object with a type of DELETE_USERS
 */
export function deleteUsers({ selectedIds }) {
  return {
    type: DELETE_USERS,
    payload: { selectedIds },
  };
}

/**
 * Dispatched when the users are deleted by the request saga
 *
 * @param  {object} deletedIds deletedIds info
 *
 * @return {object} An action object with a type of DELETE_USERS_SUCCESS passing the deletedIds
 */
export function deleteUsersSucceeded({ deletedIds }) {
  toastr.success(SUCCESS_MESSAGES.DELETE_USERS_SUCCESS);

  return {
    type: DELETE_USERS_SUCCESS,
    payload: { deletedIds },
  };
}

/**
 * Dispatched when deleting users fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of DELETE_USERS_ERROR passing the error
 */
export function deleteUsersFailed(error) {
  toastr.error(error.message);

  return {
    type: DELETE_USERS_ERROR,
    payload: { error },
  };
}
