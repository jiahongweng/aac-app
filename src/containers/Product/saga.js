import { call, fork, takeLatest } from 'redux-saga/effects';
import { appApiSaga } from 'containers/App/saga';
import { makeJsonRequestOptions } from 'utils/request';
import { FETCH_PRODUCT, CREATE_PRODUCT, DELETE_PRODUCT } from './constants';
import {
  fetchProductSucceeded,
  fetchProductFailed,
  createProductSucceeded,
  createProductFailed,
  deleteProductSucceeded,
  deleteProductFailed,
} from './actions';

/**
 * FETCH_PRODUCT saga
 */
export function* fetchProduct(action) {
  const { styleId } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'GET',
    requestUrlPath: `ssa/styles/${styleId}/products`,
  });

  yield call(appApiSaga, options, [fetchProductSucceeded], fetchProductFailed);
}

export function* fetchProductWatcher() {
  yield takeLatest(FETCH_PRODUCT, fetchProduct);
}

/**
 * CREATE_PRODUCT saga
 */
export function* createProduct(action) {
  const {
    styleId,
    styleName,
    styleImage,
    brandName,
    brandImage,
    title,
    description,
  } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: 'products',
    data: {
      styleId,
      styleName,
      styleImage,
      brandName,
      brandImage,
      title,
      description,
    },
  });

  yield call(
    appApiSaga,
    options,
    [createProductSucceeded],
    createProductFailed,
  );
}

export function* createProductWatcher() {
  yield takeLatest(CREATE_PRODUCT, createProduct);
}

/**
 * DELETE_PRODUCT saga
 */
export function* deleteProduct(action) {
  const { styleId } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'DELETE',
    requestUrlPath: `products/delete_by_style/${styleId}`,
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
 * Root saga manages watcher lifecycle
 */
export default function* productMainSaga() {
  yield fork(fetchProductWatcher);
  yield fork(createProductWatcher);
  yield fork(deleteProductWatcher);
}
