import {
  INIT_ORDER,
  FETCH_ORDER,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_ERROR,
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
} from './constants';

export const initialState = {
  order: {
    loading: undefined,
    error: undefined,
    data: undefined,
  },
};

function orderReducer(state = initialState, action) {
  const { error, data } = action.payload || {};

  switch (action.type) {
    case INIT_ORDER:
      return initialState;
    case FETCH_ORDER:
      return {
        order: {
          loading: true,
          error: false,
          data: false,
        },
      };
    case CREATE_ORDER:
    case DELETE_ORDER:
      return {
        order: {
          ...state.order,
          loading: true,
          error: false,
        },
      };
    case FETCH_ORDER_SUCCESS:
    case CREATE_ORDER_SUCCESS:
      return {
        order: {
          loading: false,
          error: false,
          data,
        },
      };
    case DELETE_ORDER_SUCCESS:
      return {
        order: {
          ...state.order,
          loading: false,
        },
      };
    case FETCH_ORDER_ERROR:
      return {
        order: {
          loading: false,
          error,
          data: false,
        },
      };
    case CREATE_ORDER_ERROR:
    case DELETE_ORDER_ERROR:
      return {
        order: {
          ...state.order,
          loading: false,
          error,
        },
      };
    default:
      return state;
  }
}

export default orderReducer;
