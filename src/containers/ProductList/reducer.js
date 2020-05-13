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

export const initialState = {
  needRefresh: false,
  products: {
    loading: undefined,
    error: undefined,
    data: undefined,
    total: 0,
    page: 0,
    limit: 0,
  },
  ssaProducts: {
    loading: undefined,
    error: undefined,
    data: undefined,
    filters: undefined,
    total: 0,
    page: 0,
    limit: 0,
  },
};

function productListReducer(state = initialState, action) {
  const { error, deletedId, deletedIds, result = {} } = action.payload || {};
  let newData = null;
  let newTotal = null;

  switch (action.type) {
    case FETCH_SSA_PRODUCTS:
      return {
        ...state,
        ssaProducts: {
          loading: true,
          error: false,
          data: [],
          filters: {},
          total: 0,
          page: 0,
          limit: 0,
        },
      };
    case FETCH_SSA_PRODUCTS_SUCCESS:
      return {
        ...state,
        needRefresh: false,
        ssaProducts: {
          loading: false,
          error: false,
          data: result.styles,
          filters: result.filters,
          total: result.total,
          page: result.page,
          limit: result.limit,
        },
      };
    case FETCH_SSA_PRODUCTS_ERROR:
      return {
        ...state,
        needRefresh: false,
        ssaProducts: {
          loading: false,
          error,
          data: [],
          filters: {},
          total: 0,
          page: 0,
          limit: 0,
        },
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: {
          loading: true,
          error: false,
          data: [],
          total: 0,
          page: 0,
          limit: 0,
        },
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        needRefresh: false,
        products: {
          loading: false,
          error: false,
          data: result.products,
          total: result.total,
          page: result.page,
          limit: result.limit,
        },
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        needRefresh: false,
        products: {
          loading: false,
          error,
          data: [],
          total: 0,
          page: 0,
          limit: 0,
        },
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
          error: false,
        },
      };
    case DELETE_PRODUCT_SUCCESS:
      newData = state.products.data.filter((item) => item.id !== deletedId);
      newTotal = state.products.total - 1;

      return {
        ...state,
        needRefresh: true,
        products: {
          loading: false,
          error: false,
          data: newData,
          total: newTotal,
        },
      };
    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        needRefresh: true,
        products: {
          ...state.products,
          loading: false,
          error,
        },
      };
    case DELETE_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
          error: false,
        },
      };
    case DELETE_PRODUCTS_SUCCESS:
      newData = state.products.data.filter(
        (item) => deletedIds.includes(item.id) === false,
      );
      newTotal = state.products.total - deletedIds.length;

      return {
        ...state,
        needRefresh: true,
        products: {
          loading: false,
          error: false,
          data: newData,
          total: newTotal,
        },
      };
    case DELETE_PRODUCTS_ERROR:
      return {
        ...state,
        needRefresh: true,
        products: {
          ...state.products,
          loading: false,
          error,
        },
      };
    default:
      return state;
  }
}

export default productListReducer;
