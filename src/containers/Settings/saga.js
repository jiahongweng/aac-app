import { call, fork, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import { UPDATE_ACCOUNT, UPDATE_ORGANIZATION } from 'containers/App/constants';
import { appApiSaga } from 'containers/App/saga';
import {
  updateAccountSucceeded,
  updateAccountFailed,
  updateOrganizationSucceeded,
  updateOrganizationFailed,
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
 * UPDATE_ORGANIZATION saga
 */
export function* updateOrganization(action) {
  const { id, name, location, shippingAddress } = action.payload;
  const data = { name, location, shippingAddress };
  const options = makeJsonRequestOptions({
    method: 'PUT',
    requestUrlPath: `users/${id}/organization`,
    data,
  });

  yield call(
    appApiSaga,
    options,
    [updateOrganizationSucceeded],
    updateOrganizationFailed,
  );
}

export function* updateOrganizationWatcher() {
  yield takeLatest(UPDATE_ORGANIZATION, updateOrganization);
}

/**
 * Root sagas manages watcher lifecycle
 */
export function* accountSettingMainSaga() {
  yield fork(updateAccountWatcher);
}
export function* organizationSettingMainSaga() {
  yield fork(updateOrganizationWatcher);
}
