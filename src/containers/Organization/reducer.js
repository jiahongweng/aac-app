import {
  INIT_ORGANIZATION,
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_ERROR,
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_ERROR,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_ERROR,
} from './constants';

export const initialState = {
  organization: {
    loading: undefined,
    error: undefined,
    data: undefined,
  },
};

function organizationReducer(state = initialState, action) {
  const { error, data } = action.payload || {};

  switch (action.type) {
    case INIT_ORGANIZATION:
      return initialState;
    case FETCH_ORGANIZATION:
    case CREATE_ORGANIZATION:
      return {
        organization: {
          loading: true,
          error: false,
          data: false,
        },
      };
    case UPDATE_ORGANIZATION:
      return {
        organization: {
          ...state.organization,
          loading: true,
          error: false,
        },
      };
    case FETCH_ORGANIZATION_SUCCESS:
    case CREATE_ORGANIZATION_SUCCESS:
    case UPDATE_ORGANIZATION_SUCCESS:
      return {
        organization: {
          loading: false,
          error: false,
          data,
        },
      };
    case FETCH_ORGANIZATION_ERROR:
    case CREATE_ORGANIZATION_ERROR:
      return {
        organization: {
          loading: false,
          error,
          data: false,
        },
      };
    case UPDATE_ORGANIZATION_ERROR:
      return {
        organization: {
          ...state.organization,
          loading: false,
          error,
        },
      };
    default:
      return state;
  }
}

export default organizationReducer;
