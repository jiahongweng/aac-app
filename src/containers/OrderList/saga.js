import { call, fork, takeLatest } from 'redux-saga/effects';
import { appApiSaga } from 'containers/App/saga';
import { makeUrlQueryParams, makeJsonRequestOptions } from 'utils/request';
import { FETCH_ORDERS } from './constants';
import { fetchOrdersSucceeded, fetchOrdersFailed } from './actions';

/**
 * FETCH_ORDERS saga
 */
export function* fetchOrders(action) {
  const { order, orderBy, page, limit } = action.payload;
  const urlQueryParams = makeUrlQueryParams([
    { order },
    { orderBy },
    { page },
    { limit },
  ]);
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `orders/${urlQueryParams}`,
  });

  yield call(appApiSaga, options, [fetchOrdersSucceeded], fetchOrdersFailed);
}

export function* fetchOrdersWatcher() {
  yield takeLatest(FETCH_ORDERS, fetchOrders);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* orderListMainSaga() {
  yield fork(fetchOrdersWatcher);
}
