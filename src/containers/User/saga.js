import { call, fork, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import { appApiSaga } from 'containers/App/saga';
import { makeJsonRequestOptions } from 'utils/request';
import { FETCH_USER, CREATE_USER, UPDATE_USER } from './constants';
import {
  fetchUserSucceeded,
  fetchUserFailed,
  createUserSucceeded,
  createUserFailed,
  updateUserSucceeded,
  updateUserFailed,
} from './actions';

/**
 * FETCH_USER saga
 */
export function* fetchUser(action) {
  const { id } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `users/${id}`,
  });

  yield call(appApiSaga, options, [fetchUserSucceeded], fetchUserFailed);
}

export function* fetchUserWatcher() {
  yield takeLatest(FETCH_USER, fetchUser);
}

/**
 * CREATE_USER saga
 */
export function* createUser(action) {
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    role,
    status,
  } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: 'users',
    data: { email, password, firstName, lastName, phone, role, status },
  });

  yield call(appApiSaga, options, [createUserSucceeded], createUserFailed);
}

export function* createUserWatcher() {
  yield takeLatest(CREATE_USER, createUser);
}

/**
 * UPDATE_USER saga
 */
export function* updateUser(action) {
  const {
    id,
    email,
    password,
    firstName,
    lastName,
    phone,
    role,
    status,
  } = action.payload;
  const data = { email, password, firstName, lastName, phone, role, status };
  if (!isEmpty(password)) {
    data.password = password;
  }
  const options = makeJsonRequestOptions({
    method: 'PUT',
    requestUrlPath: `users/${id}`,
    data,
  });

  yield call(appApiSaga, options, [updateUserSucceeded], updateUserFailed);
}

export function* updateUserWatcher() {
  yield takeLatest(UPDATE_USER, updateUser);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userMainSaga() {
  yield fork(fetchUserWatcher);
  yield fork(createUserWatcher);
  yield fork(updateUserWatcher);
}
