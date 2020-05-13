import {
  FETCH_SSA_PRODUCTS,
  FETCH_SSA_PRODUCTS_SUCCESS,
  FETCH_SSA_PRODUCTS_ERROR,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCTS,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_ERROR,
} from './constants';

/**
 * Fetch ssa products, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_SSA_PRODUCTS
 */
export function fetchSsaProducts({ search, brand, page, limit }) {
  return {
    type: FETCH_SSA_PRODUCTS,
    payload: { search, brand, page, limit },
  };
}

/**
 * Dispatched when the ssa products are fetched by the request saga
 *
 * @param  {object} products ssa products info
 *
 * @return {object} An action object with a type of FETCH_SSA_PRODUCTS_SUCCESS passing the ssa products
 */
export function fetchSsaProductsSucceeded({ data }) {
  return {
    type: FETCH_SSA_PRODUCTS_SUCCESS,
    payload: { result: data },
  };
}

/**
 * Dispatched when fetching ssa products fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_SSA_PRODUCTS_ERROR passing the error
 */
export function fetchSsaProductsFailed(error) {
  return {
    type: FETCH_SSA_PRODUCTS_ERROR,
    payload: { error },
  };
}

/**
 * Fetch products, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_PRODUCTS
 */
export function fetchProducts({ order, orderBy, page, limit }) {
  return {
    type: FETCH_PRODUCTS,
    payload: { order, orderBy, page, limit },
  };
}

/**
 * Dispatched when the products are fetched by the request saga
 *
 * @param  {object} products products info
 *
 * @return {object} An action object with a type of FETCH_PRODUCTS_SUCCESS passing the products
 */
export function fetchProductsSucceeded({ data }) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { result: data },
  };
}

/**
 * Dispatched when fetching products fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_PRODUCTS_ERROR passing the error
 */
export function fetchProductsFailed(error) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    payload: { error },
  };
}

/**
 * Delete product, this action starts the request saga
 *
 * @return {object} An action object with a type of DELETE_PRODUCT
 */
export function deleteProduct({ id }) {
  return {
    type: DELETE_PRODUCT,
    payload: { id },
  };
}

/**
 * Dispatched when the product is deleted by the request saga
 *
 * @param  {object} id deletedId info
 *
 * @return {object} An action object with a type of DELETE_PRODUCT_SUCCESS passing the deletedId
 */
export function deleteProductSucceeded({ data: { deletedId } }) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: { deletedId },
  };
}

/**
 * Dispatched when deleting product fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of DELETE_PRODUCT_ERROR passing the error
 */
export function deleteProductFailed(error) {
  return {
    type: DELETE_PRODUCT_ERROR,
    payload: { error },
  };
}

/**
 * Delete products, this action starts the request saga
 *
 * @return {object} An action object with a type of DELETE_PRODUCTS
 */
export function deleteProducts({ selectedIds }) {
  return {
    type: DELETE_PRODUCTS,
    payload: { selectedIds },
  };
}

/**
 * Dispatched when the products are deleted by the request saga
 *
 * @param  {object} deletedIds deletedIds info
 *
 * @return {object} An action object with a type of DELETE_PRODUCTS_SUCCESS passing the deletedIds
 */
export function deleteProductsSucceeded({ deletedIds }) {
  return {
    type: DELETE_PRODUCTS_SUCCESS,
    payload: { deletedIds },
  };
}

/**
 * Dispatched when deleting products fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of DELETE_PRODUCTS_ERROR passing the error
 */
export function deleteProductsFailed(error) {
  return {
    type: DELETE_PRODUCTS_ERROR,
    payload: { error },
  };
}
