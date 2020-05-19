import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_ERROR,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
} from './constants';

export const initialState = {
  needRefresh: false,
  orders: {
    loading: undefined,
    error: undefined,
    data: undefined,
    total: 0,
    page: 0,
    limit: 0,
  },
};

function orderListReducer(state = initialState, action) {
  const { error, deletedId, result = {} } = action.payload || {};
  let newData = null;
  let newTotal = null;

  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: {
          loading: true,
          error: false,
          data: [],
          total: 0,
          page: 0,
          limit: 0,
        },
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        needRefresh: false,
        orders: {
          loading: false,
          error: false,
          data: result.orders,
          total: result.total,
          page: result.page,
          limit: result.limit,
        },
      };
    case FETCH_ORDERS_ERROR:
      return {
        ...state,
        needRefresh: false,
        orders: {
          loading: false,
          error,
          data: [],
          total: 0,
          page: 0,
          limit: 0,
        },
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: true,
          error: false,
        },
      };
    case DELETE_ORDER_SUCCESS:
      newData = state.orders.data.filter((item) => item.orderId !== deletedId);
      newTotal = state.orders.total - 1;

      return {
        ...state,
        needRefresh: true,
        orders: {
          loading: false,
          error: false,
          data: newData,
          total: newTotal,
        },
      };
    case DELETE_ORDER_ERROR:
      return {
        ...state,
        needRefresh: true,
        orders: {
          ...state.orders,
          loading: false,
          error,
        },
      };
    default:
      return state;
  }
}

export default orderListReducer;
