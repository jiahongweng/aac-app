import { call, fork, takeLatest } from 'redux-saga/effects';
import { LOGIN } from 'containers/App/constants';
import { appApiSaga } from 'containers/App/saga';
import { loginSucceeded, loginFailed } from 'containers/App/actions';
import { makeJsonRequestOptions } from 'utils/request';

/**
 * LOGIN saga
 */
export function* login(action) {
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: 'auth/login',
    data: action.payload,
  });

  yield call(appApiSaga, options, [loginSucceeded], loginFailed);
}

export function* loginWatcher() {
  yield takeLatest(LOGIN, login);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginMainSaga() {
  yield fork(loginWatcher);
}
