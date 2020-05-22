import { all, call, fork, takeLatest } from 'redux-saga/effects';
import { appApiSaga } from 'containers/App/saga';
import { makeJsonRequestOptions } from 'utils/request';
import { fetchProductsWatcher } from 'containers/ProductList/saga';
import {
  fetchProductSucceeded,
  fetchProductFailed,
} from 'containers/Product/actions';
import {
  FETCH_ORDER,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  DELETE_ORDER_DESIGN,
} from './constants';
import {
  fetchOrderSucceeded,
  fetchOrderFailed,
  createOrderSucceeded,
  createOrderFailed,
  updateOrderSucceeded,
  updateOrderFailed,
  deleteOrderSucceeded,
  deleteOrderFailed,
  deleteOrderDesignSucceeded,
  deleteOrderDesignFailed,
} from './actions';

/**
 * FETCH_ORDER saga
 */
export function* fetchOrder(action) {
  const { orderId, styleId = null } = action.payload;
  const orderOptions = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `orders/${orderId}`,
  });

  if (styleId) {
    const styleOptions = makeJsonRequestOptions({
      method: 'GET',
      requestUrlPath: `ssa/styles/${styleId}/products`,
    });

    yield all([
      call(appApiSaga, orderOptions, [fetchOrderSucceeded], fetchOrderFailed),
      call(
        appApiSaga,
        styleOptions,
        [fetchProductSucceeded],
        fetchProductFailed,
      ),
    ]);
  } else {
    yield call(
      appApiSaga,
      orderOptions,
      [fetchOrderSucceeded],
      fetchOrderFailed,
    );
  }
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
 * UPDATE_ORDER saga
 */
export function* updateOrder(action) {
  const { orderId, ...rest } = action.payload;
  const data = { ...rest };
  const options = makeJsonRequestOptions({
    method: 'PUT',
    requestUrlPath: `orders/${orderId}`,
    data,
  });

  yield call(appApiSaga, options, [updateOrderSucceeded], updateOrderFailed);
}

export function* updateOrderWatcher() {
  yield takeLatest(UPDATE_ORDER, updateOrder);
}

/**
 * DELETE_ORDER saga
 */
export function* deleteOrder(action) {
  const { orderId } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'DELETE',
    requestUrlPath: `orders/${orderId}`,
  });

  yield call(appApiSaga, options, [deleteOrderSucceeded], deleteOrderFailed);
}

export function* deleteOrderWatcher() {
  yield takeLatest(DELETE_ORDER, deleteOrder);
}

/**
 * DELETE_ORDER_DESIGN saga
 */
export function* deleteOrderDesign(action) {
  const { orderId, img } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'DELETE',
    requestUrlPath: `orders/${orderId}/designs`,
    data: { img },
  });

  yield call(
    appApiSaga,
    options,
    [deleteOrderDesignSucceeded],
    deleteOrderDesignFailed,
  );
}

export function* deleteOrderDesignWatcher() {
  yield takeLatest(DELETE_ORDER_DESIGN, deleteOrderDesign);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* createOrderMainSaga() {
  yield fork(fetchProductsWatcher);
  yield fork(createOrderWatcher);
}

export function* orderMainSaga() {
  yield fork(fetchOrderWatcher);
  yield fork(updateOrderWatcher);
  yield fork(deleteOrderWatcher);
  yield fork(deleteOrderDesignWatcher);
}
