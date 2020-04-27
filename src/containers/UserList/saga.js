import { call, fork, takeLatest } from 'redux-saga/effects';
import { appApiSaga } from 'containers/App/saga';
import { makeUrlQueryParams, makeJsonRequestOptions } from 'utils/request';
import { FETCH_USERS, DELETE_USER, DELETE_USERS } from './constants';
import {
  fetchUsersSucceeded,
  fetchUsersFailed,
  deleteUserSucceeded,
  deleteUserFailed,
  deleteUsersSucceeded,
  deleteUsersFailed,
} from './actions';

/**
 * FETCH_USERS saga
 */
export function* fetchUsers(action) {
  const { order, orderBy, page, limit } = action.payload;
  const urlQueryParams = makeUrlQueryParams([
    { order },
    { orderBy },
    { page },
    { limit },
  ]);
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `users${urlQueryParams}`,
  });

  yield call(appApiSaga, options, [fetchUsersSucceeded], fetchUsersFailed);
}

export function* fetchUsersWatcher() {
  yield takeLatest(FETCH_USERS, fetchUsers);
}

/**
 * DELETE_USER saga
 */
export function* deleteUser(action) {
  const { id } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'DELETE',
    requestUrlPath: `users/${id}`,
  });

  yield call(appApiSaga, options, [deleteUserSucceeded], deleteUserFailed);
}

export function* deleteUserWatcher() {
  yield takeLatest(DELETE_USER, deleteUser);
}

/**
 * DELETE_USERS saga
 */
export function* deleteUsers(action) {
  const { selectedIds } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: `users/deleteBatch`,
    data: { selectedIds },
  });

  yield call(appApiSaga, options, [deleteUsersSucceeded], deleteUsersFailed);
}

export function* deleteUsersWatcher() {
  yield takeLatest(DELETE_USERS, deleteUsers);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userListMainSaga() {
  yield fork(fetchUsersWatcher);
  yield fork(deleteUserWatcher);
  yield fork(deleteUsersWatcher);
}
