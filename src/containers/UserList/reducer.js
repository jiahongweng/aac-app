import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_USERS,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
} from './constants';

export const initialState = {
  needRefresh: false,
  users: {
    loading: undefined,
    error: undefined,
    data: undefined,
    total: 0,
    page: 0,
    limit: 0,
  },
};

function userListReducer(state = initialState, action) {
  const { error, deletedId, deletedIds, result = {} } = action.payload || {};
  let newData = null;
  let newTotal = null;

  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: {
          loading: true,
          error: false,
          data: [],
          total: 0,
          page: 0,
          limit: 0,
        },
      };
    case FETCH_USERS_SUCCESS:
      return {
        needRefresh: false,
        users: {
          loading: false,
          error: false,
          data: result.users,
          total: result.total,
          page: result.page,
          limit: result.limit,
        },
      };
    case FETCH_USERS_ERROR:
      return {
        needRefresh: false,
        users: {
          loading: false,
          error,
          data: [],
          total: 0,
          page: 0,
          limit: 0,
        },
      };
    case DELETE_USER:
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
          error: false,
        },
      };
    case DELETE_USER_SUCCESS:
      newData = state.users.data.filter((item) => item.id !== deletedId);
      newTotal = state.users.total - 1;

      return {
        needRefresh: true,
        users: {
          loading: false,
          error: false,
          data: newData,
          total: newTotal,
        },
      };
    case DELETE_USER_ERROR:
      return {
        needRefresh: true,
        users: {
          ...state.users,
          loading: false,
          error,
        },
      };
    case DELETE_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
          error: false,
        },
      };
    case DELETE_USERS_SUCCESS:
      newData = state.users.data.filter(
        (item) => deletedIds.includes(item.id) === false,
      );
      newTotal = state.users.total - deletedIds.length;

      return {
        needRefresh: true,
        users: {
          loading: false,
          error: false,
          data: newData,
          total: newTotal,
        },
      };
    case DELETE_USERS_ERROR:
      return {
        needRefresh: true,
        users: {
          ...state.users,
          loading: false,
          error,
        },
      };
    default:
      return state;
  }
}

export default userListReducer;
