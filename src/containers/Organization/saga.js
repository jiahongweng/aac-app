import { call, fork, takeLatest } from 'redux-saga/effects';
import { appApiSaga } from 'containers/App/saga';
import { makeJsonRequestOptions } from 'utils/request';
import {
  FETCH_ORGANIZATION,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
} from './constants';
import {
  fetchOrganizationSucceeded,
  fetchOrganizationFailed,
  createOrganizationSucceeded,
  createOrganizationFailed,
  updateOrganizationSucceeded,
  updateOrganizationFailed,
} from './actions';

/**
 * FETCH_ORGANIZATION saga
 */
export function* fetchOrganization(action) {
  const { id } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `organizations/${id}`,
  });

  yield call(
    appApiSaga,
    options,
    [fetchOrganizationSucceeded],
    fetchOrganizationFailed,
  );
}

export function* fetchOrganizationWatcher() {
  yield takeLatest(FETCH_ORGANIZATION, fetchOrganization);
}

/**
 * CREATE_ORGANIZATION saga
 */
export function* createOrganization(action) {
  const { userId, name, location, shippingAddress } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: 'organizations',
    data: { userId, name, location, shippingAddress },
  });

  yield call(
    appApiSaga,
    options,
    [createOrganizationSucceeded],
    createOrganizationFailed,
  );
}

export function* createOrganizationWatcher() {
  yield takeLatest(CREATE_ORGANIZATION, createOrganization);
}

/**
 * UPDATE_ORGANIZATION saga
 */
export function* updateOrganization(action) {
  const { id, name, location, shippingAddress } = action.payload;
  const data = { name, location, shippingAddress };
  const options = makeJsonRequestOptions({
    method: 'PUT',
    requestUrlPath: `organizations/${id}`,
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
 * Root saga manages watcher lifecycle
 */
export default function* organizationMainSaga() {
  yield fork(fetchOrganizationWatcher);
  yield fork(createOrganizationWatcher);
  yield fork(updateOrganizationWatcher);
}
