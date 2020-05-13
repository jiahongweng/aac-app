import {
  INIT_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from './constants';

/**
 * Initialize product, this action starts the request saga
 *
 * @return {object} An action object with a type of INIT_PRODUCT
 */
export function initProduct() {
  return {
    type: INIT_PRODUCT,
  };
}

/**
 * Fetch product, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_PRODUCT
 */
export function fetchProduct({ styleId }) {
  return {
    type: FETCH_PRODUCT,
    payload: { styleId },
  };
}

/**
 * Dispatched when the product is fetched by the request saga
 *
 * @param  {object} product product info
 *
 * @return {object} An action object with a type of FETCH_PRODUCT_SUCCESS passing the product
 */
export function fetchProductSucceeded({ data }) {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: { data },
  };
}

/**
 * Dispatched when fetching product fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_PRODUCT_ERROR passing the error
 */
export function fetchProductFailed(error) {
  return {
    type: FETCH_PRODUCT_ERROR,
    payload: { error },
  };
}

/**
 * Create product, this action starts the request saga
 *
 * @return {object} An action object with a type of CREATE_PRODUCT
 */
export function createProduct({
  styleId,
  styleName,
  styleImage,
  brandName,
  brandImage,
  title,
  description,
}) {
  return {
    type: CREATE_PRODUCT,
    payload: {
      styleId,
      styleName,
      styleImage,
      brandName,
      brandImage,
      title,
      description,
    },
  };
}

/**
 * Dispatched when the product is created by the request saga
 *
 * @param  {object} product created product info
 *
 * @return {object} An action object with a type of CREATE_PRODUCT_SUCCESS passing the product
 */
export function createProductSucceeded({ data }) {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: { data },
  };
}

/**
 * Dispatched when creating product fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CREATE_PRODUCT_ERROR passing the error
 */
export function createProductFailed(error) {
  return {
    type: CREATE_PRODUCT_ERROR,
    payload: { error },
  };
}

/**
 * Delete product, this action starts the request saga
 *
 * @return {object} An action object with a type of DELETE_PRODUCT
 */
export function deleteProduct({ styleId }) {
  return {
    type: DELETE_PRODUCT,
    payload: {
      styleId,
    },
  };
}

/**
 * Dispatched when the product is deleted by the request saga
 *
 * @param  {object} product deleted product info
 *
 * @return {object} An action object with a type of DELETE_PRODUCT_SUCCESS passing the product
 */
export function deleteProductSucceeded({ data }) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: { data },
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
