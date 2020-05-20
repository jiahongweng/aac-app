import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_ERROR,
} from './constants';

/**
 * Fetch orders, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_ORDERS
 */
export function fetchOrders({ order, orderBy, page, limit }) {
  return {
    type: FETCH_ORDERS,
    payload: { order, orderBy, page, limit },
  };
}

/**
 * Dispatched when the orders are fetched by the request saga
 *
 * @param  {object} orders orders info
 *
 * @return {object} An action object with a type of FETCH_ORDERS_SUCCESS passing the orders
 */
export function fetchOrdersSucceeded({ data }) {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: { result: data },
  };
}

/**
 * Dispatched when fetching orders fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_ORDERS_ERROR passing the error
 */
export function fetchOrdersFailed(error) {
  return {
    type: FETCH_ORDERS_ERROR,
    payload: { error },
  };
}
