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

export const initialState = {
  product: {
    loading: undefined,
    error: undefined,
    data: undefined,
  },
};

function productReducer(state = initialState, action) {
  const { error, data } = action.payload || {};

  switch (action.type) {
    case INIT_PRODUCT:
      return initialState;
    case FETCH_PRODUCT:
      return {
        product: {
          loading: true,
          error: false,
          data: false,
        },
      };
    case CREATE_PRODUCT:
    case DELETE_PRODUCT:
      return {
        product: {
          ...state.product,
          loading: true,
          error: false,
        },
      };
    case FETCH_PRODUCT_SUCCESS:
    case CREATE_PRODUCT_SUCCESS:
      return {
        product: {
          loading: false,
          error: false,
          data,
        },
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        product: {
          ...state.product,
          loading: false,
        },
      };
    case FETCH_PRODUCT_ERROR:
      return {
        product: {
          loading: false,
          error,
          data: false,
        },
      };
    case CREATE_PRODUCT_ERROR:
    case DELETE_PRODUCT_ERROR:
      return {
        product: {
          ...state.product,
          loading: false,
          error,
        },
      };
    default:
      return state;
  }
}

export default productReducer;
