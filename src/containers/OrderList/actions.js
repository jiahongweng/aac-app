import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_ERROR,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
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

/**
 * Delete order, this action starts the request saga
 *
 * @return {object} An action object with a type of DELETE_ORDER
 */
export function deleteOrder({ orderId }) {
  return {
    type: DELETE_ORDER,
    payload: { orderId },
  };
}

/**
 * Dispatched when the order is deleted by the request saga
 *
 * @param  {object} id deletedId info
 *
 * @return {object} An action object with a type of DELETE_ORDER_SUCCESS passing the deletedId
 */
export function deleteOrderSucceeded({ data: { deletedId } }) {
  return {
    type: DELETE_ORDER_SUCCESS,
    payload: { deletedId },
  };
}

/**
 * Dispatched when deleting order fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of DELETE_ORDER_ERROR passing the error
 */
export function deleteOrderFailed(error) {
  return {
    type: DELETE_ORDER_ERROR,
    payload: { error },
  };
}
