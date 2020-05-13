import { call, fork, takeLatest } from 'redux-saga/effects';
import { appApiSaga } from 'containers/App/saga';
import { makeUrlQueryParams, makeJsonRequestOptions } from 'utils/request';
import {
  FETCH_SSA_PRODUCTS,
  FETCH_PRODUCTS,
  DELETE_PRODUCT,
  DELETE_PRODUCTS,
} from './constants';
import {
  fetchSsaProductsSucceeded,
  fetchSsaProductsFailed,
  fetchProductsSucceeded,
  fetchProductsFailed,
  deleteProductSucceeded,
  deleteProductFailed,
  deleteProductsSucceeded,
  deleteProductsFailed,
} from './actions';

/**
 * FETCH_SSA_PRODUCTS saga
 */
export function* fetchSsaProducts(action) {
  const { search, brand, page, limit } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `ssa/styles`,
    params: {
      search,
      brand,
      page,
      limit,
    },
  });

  yield call(
    appApiSaga,
    options,
    [fetchSsaProductsSucceeded],
    fetchSsaProductsFailed,
  );
}

export function* fetchSsaProductsWatcher() {
  yield takeLatest(FETCH_SSA_PRODUCTS, fetchSsaProducts);
}

/**
 * FETCH_PRODUCTS saga
 */
export function* fetchProducts(action) {
  const { order, orderBy, page, limit } = action.payload;
  const urlQueryParams = makeUrlQueryParams([
    { order },
    { orderBy },
    { page },
    { limit },
  ]);
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `products/${urlQueryParams}`,
  });

  yield call(
    appApiSaga,
    options,
    [fetchProductsSucceeded],
    fetchProductsFailed,
  );
}

export function* fetchProductsWatcher() {
  yield takeLatest(FETCH_PRODUCTS, fetchProducts);
}

/**
 * DELETE_PRODUCT saga
 */
export function* deleteProduct(action) {
  const { id } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'DELETE',
    requestUrlPath: `products/${id}`,
  });

  yield call(
    appApiSaga,
    options,
    [deleteProductSucceeded],
    deleteProductFailed,
  );
}

export function* deleteProductWatcher() {
  yield takeLatest(DELETE_PRODUCT, deleteProduct);
}

/**
 * DELETE_PRODUCTS saga
 */
export function* deleteProducts(action) {
  const { selectedIds } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: `products/deleteBatch`,
    data: { selectedIds },
  });

  yield call(
    appApiSaga,
    options,
    [deleteProductsSucceeded],
    deleteProductsFailed,
  );
}

export function* deleteProductsWatcher() {
  yield takeLatest(DELETE_PRODUCTS, deleteProducts);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* ssaProductListMainSaga() {
  yield fork(fetchSsaProductsWatcher);
}

export function* productListMainSaga() {
  yield fork(fetchProductsWatcher);
  yield fork(deleteProductWatcher);
  yield fork(deleteProductsWatcher);
}
