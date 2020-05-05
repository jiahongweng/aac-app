import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS_ERROR,
  DELETE_ORGANIZATION,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_ERROR,
  DELETE_ORGANIZATIONS,
  DELETE_ORGANIZATIONS_SUCCESS,
  DELETE_ORGANIZATIONS_ERROR,
} from './constants';

export const initialState = {
  needRefresh: false,
  organizations: {
    loading: undefined,
    error: undefined,
    data: undefined,
    total: 0,
    page: 0,
    limit: 0,
  },
};

function organizationListReducer(state = initialState, action) {
  const { error, deletedId, deletedIds, result = {} } = action.payload || {};
  let newData = null;
  let newTotal = null;

  switch (action.type) {
    case FETCH_ORGANIZATIONS:
      return {
        ...state,
        organizations: {
          loading: true,
          error: false,
          data: [],
          total: 0,
          page: 0,
          limit: 0,
        },
      };
    case FETCH_ORGANIZATIONS_SUCCESS:
      return {
        needRefresh: false,
        organizations: {
          loading: false,
          error: false,
          data: result.organizations,
          total: result.total,
          page: result.page,
          limit: result.limit,
        },
      };
    case FETCH_ORGANIZATIONS_ERROR:
      return {
        needRefresh: false,
        organizations: {
          loading: false,
          error,
          data: [],
          total: 0,
          page: 0,
          limit: 0,
        },
      };
    case DELETE_ORGANIZATION:
      return {
        ...state,
        organizations: {
          ...state.organizations,
          loading: true,
          error: false,
        },
      };
    case DELETE_ORGANIZATION_SUCCESS:
      newData = state.organizations.data.filter(
        (item) => item.id !== deletedId,
      );
      newTotal = state.organizations.total - 1;

      return {
        needRefresh: true,
        organizations: {
          loading: false,
          error: false,
          data: newData,
          total: newTotal,
        },
      };
    case DELETE_ORGANIZATION_ERROR:
      return {
        needRefresh: true,
        organizations: {
          ...state.organizations,
          loading: false,
          error,
        },
      };
    case DELETE_ORGANIZATIONS:
      return {
        ...state,
        organizations: {
          ...state.organizations,
          loading: true,
          error: false,
        },
      };
    case DELETE_ORGANIZATIONS_SUCCESS:
      newData = state.organizations.data.filter(
        (item) => deletedIds.includes(item.id) === false,
      );
      newTotal = state.organizations.total - deletedIds.length;

      return {
        needRefresh: true,
        organizations: {
          loading: false,
          error: false,
          data: newData,
          total: newTotal,
        },
      };
    case DELETE_ORGANIZATIONS_ERROR:
      return {
        needRefresh: true,
        organizations: {
          ...state.organizations,
          loading: false,
          error,
        },
      };
    default:
      return state;
  }
}

export default organizationListReducer;
