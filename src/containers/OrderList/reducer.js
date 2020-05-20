import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_ERROR,
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
  const { error, result = {} } = action.payload || {};

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
    default:
      return state;
  }
}

export default orderListReducer;
