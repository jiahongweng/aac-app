import { call, fork, takeLatest } from 'redux-saga/effects';
import { appApiSaga } from 'containers/App/saga';
import { makeUrlQueryParams, makeJsonRequestOptions } from 'utils/request';
import {
  FETCH_ORGANIZATIONS,
  DELETE_ORGANIZATION,
  DELETE_ORGANIZATIONS,
} from './constants';
import {
  fetchOrganizationsSucceeded,
  fetchOrganizationsFailed,
  deleteOrganizationSucceeded,
  deleteOrganizationFailed,
  deleteOrganizationsSucceeded,
  deleteOrganizationsFailed,
} from './actions';

/**
 * FETCH_ORGANIZATIONS saga
 */
export function* fetchOrganizations(action) {
  const { order, orderBy, page, limit } = action.payload;
  const urlQueryParams = makeUrlQueryParams([
    { order },
    { orderBy },
    { page },
    { limit },
  ]);
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `organizations${urlQueryParams}`,
  });

  yield call(
    appApiSaga,
    options,
    [fetchOrganizationsSucceeded],
    fetchOrganizationsFailed,
  );
}

export function* fetchOrganizationsWatcher() {
  yield takeLatest(FETCH_ORGANIZATIONS, fetchOrganizations);
}

/**
 * DELETE_ORGANIZATION saga
 */
export function* deleteOrganization(action) {
  const { id } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'DELETE',
    requestUrlPath: `organizations/${id}`,
  });

  yield call(
    appApiSaga,
    options,
    [deleteOrganizationSucceeded],
    deleteOrganizationFailed,
  );
}

export function* deleteOrganizationWatcher() {
  yield takeLatest(DELETE_ORGANIZATION, deleteOrganization);
}

/**
 * DELETE_ORGANIZATIONS saga
 */
export function* deleteOrganizations(action) {
  const { selectedIds } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: `organizations/deleteBatch`,
    data: { selectedIds },
  });

  yield call(
    appApiSaga,
    options,
    [deleteOrganizationsSucceeded],
    deleteOrganizationsFailed,
  );
}

export function* deleteOrganizationsWatcher() {
  yield takeLatest(DELETE_ORGANIZATIONS, deleteOrganizations);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* organizationListMainSaga() {
  yield fork(fetchOrganizationsWatcher);
  yield fork(deleteOrganizationWatcher);
  yield fork(deleteOrganizationsWatcher);
}
