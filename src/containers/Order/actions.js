import {
  INIT_ORDER,
  FETCH_ORDER,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_ERROR,
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  UPDATE_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
  DELETE_ORDER_DESIGN,
  DELETE_ORDER_DESIGN_SUCCESS,
  DELETE_ORDER_DESIGN_ERROR,
} from './constants';

/**
 * Initialize order, this action starts the request saga
 *
 * @return {object} An action object with a type of INIT_ORDER
 */
export function initOrder() {
  return {
    type: INIT_ORDER,
  };
}

/**
 * Fetch order, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_ORDER
 */
export function fetchOrder({ orderId, styleId }) {
  return {
    type: FETCH_ORDER,
    payload: { orderId, styleId },
  };
}

/**
 * Dispatched when the order is fetched by the request saga
 *
 * @param  {object} order order info
 *
 * @return {object} An action object with a type of FETCH_ORDER_SUCCESS passing the order
 */
export function fetchOrderSucceeded({ data }) {
  return {
    type: FETCH_ORDER_SUCCESS,
    payload: { data },
  };
}

/**
 * Dispatched when fetching order fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_ORDER_ERROR passing the error
 */
export function fetchOrderFailed(error) {
  return {
    type: FETCH_ORDER_ERROR,
    payload: { error },
  };
}

/**
 * Create order, this action starts the request saga
 *
 * @return {object} An action object with a type of CREATE_ORDER
 */
export function createOrder({ styleId, dueDate, note, products }) {
  return {
    type: CREATE_ORDER,
    payload: {
      styleId,
      dueDate,
      note,
      products,
    },
  };
}

/**
 * Dispatched when the order is created by the request saga
 *
 * @param  {object} order created order info
 *
 * @return {object} An action object with a type of CREATE_ORDER_SUCCESS passing the order
 */
export function createOrderSucceeded({ data }) {
  return {
    type: CREATE_ORDER_SUCCESS,
    payload: { data },
  };
}

/**
 * Dispatched when creating order fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CREATE_ORDER_ERROR passing the error
 */
export function createOrderFailed(error) {
  return {
    type: CREATE_ORDER_ERROR,
    payload: { error },
  };
}

/**
 * Update order, this action starts the request saga
 *
 * @return {object} An action object with a type of UPDATE_ORDER
 */
export function updateOrder(payload) {
  return {
    type: UPDATE_ORDER,
    payload,
  };
}

/**
 * Dispatched when the order is updated by the request saga
 *
 * @param  {object} order updated order info
 *
 * @return {object} An action object with a type of UPDATE_ORDER_SUCCESS passing the order
 */
export function updateOrderSucceeded({ data }) {
  return {
    type: UPDATE_ORDER_SUCCESS,
    payload: { data },
  };
}

/**
 * Dispatched when updating order fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of UPDATE_ORDER_ERROR passing the error
 */
export function updateOrderFailed(error) {
  return {
    type: UPDATE_ORDER_ERROR,
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
    payload: {
      orderId,
    },
  };
}

/**
 * Dispatched when the order is deleted by the request saga
 *
 * @param  {object} order deleted order info
 *
 * @return {object} An action object with a type of DELETE_ORDER_SUCCESS passing the order
 */
export function deleteOrderSucceeded({ data }) {
  return {
    type: DELETE_ORDER_SUCCESS,
    payload: { data },
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

/**
 * Delete order design file, this action starts the request saga
 *
 * @return {object} An action object with a type of DELETE_ORDER_DESIGN
 */
export function deleteOrderDesign({ orderId, img }) {
  return {
    type: DELETE_ORDER_DESIGN,
    payload: {
      orderId,
      img,
    },
  };
}

/**
 * Dispatched when the order design is deleted by the request saga
 *
 * @param  {object} order deleted order info
 *
 * @return {object} An action object with a type of DELETE_ORDER_DESIGN_SUCCESS passing the order
 */
export function deleteOrderDesignSucceeded({ data }) {
  return {
    type: DELETE_ORDER_DESIGN_SUCCESS,
    payload: { data },
  };
}

/**
 * Dispatched when deleting order fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of DELETE_ORDER_DESIGN_ERROR passing the error
 */
export function deleteOrderDesignFailed(error) {
  return {
    type: DELETE_ORDER_DESIGN_ERROR,
    payload: { error },
  };
}
