import { call, fork, takeLatest } from 'redux-saga/effects';
import { appApiSaga } from 'containers/App/saga';
import { makeJsonRequestOptions } from 'utils/request';
import { fetchProductsWatcher } from 'containers/ProductList/saga';
import { fetchProductWatcher } from 'containers/Product/saga';
import { FETCH_ORDER, CREATE_ORDER } from './constants';
import {
  fetchOrderSucceeded,
  fetchOrderFailed,
  createOrderSucceeded,
  createOrderFailed,
} from './actions';

/**
 * FETCH_ORDER saga
 */
export function* fetchOrder(action) {
  const { orderId } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `orders/${orderId}`,
  });

  yield call(appApiSaga, options, [fetchOrderSucceeded], fetchOrderFailed);
}

export function* fetchOrderWatcher() {
  yield takeLatest(FETCH_ORDER, fetchOrder);
}

/**
 * CREATE_ORDER saga
 */
export function* createOrder(action) {
  const { styleId, dueDate, note, products } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: 'orders',
    data: {
      styleId,
      dueDate,
      note,
      products,
    },
  });

  yield call(appApiSaga, options, [createOrderSucceeded], createOrderFailed);
}

export function* createOrderWatcher() {
  yield takeLatest(CREATE_ORDER, createOrder);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* orderMainSaga() {
  yield fork(fetchOrderWatcher);
  yield fork(fetchProductsWatcher);
  // yield fork(fetchProductWatcher);
  yield fork(createOrderWatcher);
}
