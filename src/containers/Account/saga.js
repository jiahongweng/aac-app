import { call, fork, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import { UPDATE_ACCOUNT } from 'containers/App/constants';
import { appApiSaga } from 'containers/App/saga';
import {
  updateAccountSucceeded,
  updateAccountFailed,
} from 'containers/App/actions';
import { makeJsonRequestOptions } from 'utils/request';

/**
 * UPDATE_ACCOUNT saga
 */
export function* updateAccount(action) {
  const {
    id,
    firstName,
    lastName,
    phone,
    password,
    oldPassword,
  } = action.payload;
  const data = { firstName, lastName, phone };
  if (!isEmpty(password)) {
    data.password = password;
  }
  if (!isEmpty(oldPassword)) {
    data.oldPassword = oldPassword;
  }
  const options = makeJsonRequestOptions({
    method: 'PUT',
    requestUrlPath: `users/${id}`,
    data,
  });

  yield call(
    appApiSaga,
    options,
    [updateAccountSucceeded],
    updateAccountFailed,
  );
}

export function* updateAccountWatcher() {
  yield takeLatest(UPDATE_ACCOUNT, updateAccount);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* accountMainSaga() {
  yield fork(updateAccountWatcher);
}
