import { call, fork, takeLatest } from 'redux-saga/effects';
import { ACTIVATE_ACCOUNT } from 'containers/App/constants';
import { appApiSaga } from 'containers/App/saga';
import {
  activateAccountSucceeded,
  activateAccountFailed,
} from 'containers/App/actions';
import { makeJsonRequestOptions } from 'utils/request';

/**
 * ACTIVATE_ACCOUNT saga
 */
export function* activateAccount(action) {
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `auth/activate/${action.payload.verificationCode}`,
  });

  yield call(
    appApiSaga,
    options,
    [activateAccountSucceeded],
    activateAccountFailed,
  );
}

export function* activateAccountWatcher() {
  yield takeLatest(ACTIVATE_ACCOUNT, activateAccount);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* activateAccountMainSaga() {
  yield fork(activateAccountWatcher);
}
