import { call, fork, takeLatest } from 'redux-saga/effects';
import {
  LOGIN,
  REGISTER,
  GOOGLE_LOGIN,
  GOOGLE_REGISTER,
  ACTIVATE_ACCOUNT,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from 'containers/App/constants';
import { appApiSaga } from 'containers/App/saga';
import {
  loginSucceeded,
  loginFailed,
  registerSucceeded,
  registerFailed,
  activateAccountSucceeded,
  activateAccountFailed,
  forgotPasswordSucceeded,
  forgotPasswordFailed,
  resetPasswordSucceeded,
  resetPasswordFailed,
} from 'containers/App/actions';
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
 * REGISTER saga
 */
export function* register(action) {
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: 'auth/register',
    data: action.payload,
  });

  yield call(appApiSaga, options, [registerSucceeded], registerFailed);
}

export function* registerWatcher() {
  yield takeLatest(REGISTER, register);
}

/**
 * GOOGLE LOGIN saga
 */
export function* googleLogin(action) {
  const { idToken } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: 'auth/google',
    data: {
      mode: 'login',
      idToken,
    },
  });

  yield call(appApiSaga, options, [loginSucceeded], loginFailed);
}

export function* googleLoginWatcher() {
  yield takeLatest(GOOGLE_LOGIN, googleLogin);
}

/**
 * GOOGLE REGISTER saga
 */
export function* googleRegister(action) {
  const { idToken } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: 'auth/google',
    data: {
      mode: 'register',
      idToken,
    },
  });

  yield call(appApiSaga, options, [loginSucceeded], registerFailed);
}

export function* googleRegisterWatcher() {
  yield takeLatest(GOOGLE_REGISTER, googleRegister);
}

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
 * FORGOT_PASSWORD saga
 */
export function* forgotPassword(action) {
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: 'auth/forgot',
    data: action.payload,
  });

  yield call(
    appApiSaga,
    options,
    [forgotPasswordSucceeded],
    forgotPasswordFailed,
  );
}

export function* forgotPasswordWatcher() {
  yield takeLatest(FORGOT_PASSWORD, forgotPassword);
}

/**
 * RESET_PASSWORD saga
 */
export function* resetPassword(action) {
  const { token, password } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: `auth/reset/${token}`,
    data: { password },
  });

  yield call(
    appApiSaga,
    options,
    [resetPasswordSucceeded],
    resetPasswordFailed,
  );
}

export function* resetPasswordWatcher() {
  yield takeLatest(RESET_PASSWORD, resetPassword);
}

/**
 * Root sagas manages watcher lifecycle
 */
export function* loginMainSaga() {
  yield fork(loginWatcher);
  yield fork(googleLoginWatcher);
}
export function* registerMainSaga() {
  yield fork(registerWatcher);
  yield fork(googleRegisterWatcher);
}
export function* activateMainSaga() {
  yield fork(activateAccountWatcher);
}
export function* forgotPasswordMainSaga() {
  yield fork(forgotPasswordWatcher);
}
export function* resetPasswordMainSaga() {
  yield fork(resetPasswordWatcher);
}
