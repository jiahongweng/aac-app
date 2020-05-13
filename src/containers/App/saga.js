import HttpStatus from 'http-status';
import { put, call } from 'redux-saga/effects';
import { authTokenFailed } from 'containers/App/actions';
import { getAuthHeader } from 'utils/auth';
import request from 'utils/request';

/**
 * Base saga
 */
export function* appApiSaga(options, successHandlers, errorHandler) {
  try {
    // eslint-disable-next-line no-param-reassign
    options.headers = {
      ...options.headers,
      ...getAuthHeader(),
    };
    const response = yield call(request, options);
    for (let i = 0; i < successHandlers.length; i++) {
      yield put(successHandlers[i](response.data));
    }
  } catch (err) {
    const { response: errResponse } = err;

    if (errResponse.status === HttpStatus.UNAUTHORIZED) {
      yield put(authTokenFailed());
    }
    yield put(errorHandler(errResponse.data));
  }
}
