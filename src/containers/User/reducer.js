import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from './constants';

export const initialState = {
  user: {
    loading: undefined,
    error: undefined,
    data: undefined,
  },
};

function userReducer(state = initialState, action) {
  const { error, data } = action.payload || {};

  switch (action.type) {
    case FETCH_USER:
    case CREATE_USER:
      return {
        user: {
          loading: true,
          error: false,
          data: false,
        },
      };
    case UPDATE_USER:
      return {
        user: {
          ...state.user,
          loading: true,
          error: false,
        },
      };
    case FETCH_USER_SUCCESS:
    case CREATE_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        user: {
          loading: false,
          error: false,
          data,
        },
      };
    case FETCH_USER_ERROR:
    case CREATE_USER_ERROR:
      return {
        user: {
          loading: false,
          error,
          data: false,
        },
      };
    case UPDATE_USER_ERROR:
      return {
        user: {
          ...state.user,
          loading: false,
          error,
        },
      };
    default:
      return state;
  }
}

export default userReducer;
