import { call, fork, takeLatest } from 'redux-saga/effects';
import { UPDATE_ORGANIZATION } from 'containers/App/constants';
import { appApiSaga } from 'containers/App/saga';
import {
  updateOrganizationSucceeded,
  updateOrganizationFailed,
} from 'containers/App/actions';
import { makeJsonRequestOptions } from 'utils/request';

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
 * Root saga manages watcher lifecycle
 */
export default function* accountMainSaga() {
  yield fork(updateOrganizationWatcher);
}
