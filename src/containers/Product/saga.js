import { call, fork, takeLatest } from 'redux-saga/effects';
import { appApiSaga } from 'containers/App/saga';
import { makeJsonRequestOptions } from 'utils/request';
import { FETCH_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from './constants';
import {
  fetchProductSucceeded,
  fetchProductFailed,
  createProductSucceeded,
  createProductFailed,
  updateProductSucceeded,
  updateProductFailed,
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
    title,
    description,
  } = action.payload;
  const options = makeJsonRequestOptions({
    method: 'POST',
    requestUrlPath: 'products',
    data: { styleId, styleName, styleImage, brandName, title, description },
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
 * UPDATE_PRODUCT saga
 */
export function* updateProduct(action) {
  const {
    id,
    styleId,
    styleName,
    styleImage,
    brandName,
    title,
    description,
  } = action.payload;
  const data = {
    styleId,
    styleName,
    styleImage,
    brandName,
    title,
    description,
  };
  const options = makeJsonRequestOptions({
    method: 'PUT',
    requestUrlPath: `products/${id}`,
    data,
  });

  yield call(
    appApiSaga,
    options,
    [updateProductSucceeded],
    updateProductFailed,
  );
}

export function* updateProductWatcher() {
  yield takeLatest(UPDATE_PRODUCT, updateProduct);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* productMainSaga() {
  yield fork(fetchProductWatcher);
  yield fork(createProductWatcher);
  yield fork(updateProductWatcher);
}
