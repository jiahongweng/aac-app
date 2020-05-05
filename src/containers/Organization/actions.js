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

/**
 * Initialize organization, this action starts the request saga
 *
 * @return {object} An action object with a type of INIT_ORGANIZATION
 */
export function initOrganization() {
  return {
    type: INIT_ORGANIZATION,
  };
}

/**
 * Fetch organization, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_ORGANIZATION
 */
export function fetchOrganization({ id }) {
  return {
    type: FETCH_ORGANIZATION,
    payload: { id },
  };
}

/**
 * Dispatched when the organization is fetched by the request saga
 *
 * @param  {object} organization organization info
 *
 * @return {object} An action object with a type of FETCH_ORGANIZATION_SUCCESS passing the organization
 */
export function fetchOrganizationSucceeded({ data }) {
  return {
    type: FETCH_ORGANIZATION_SUCCESS,
    payload: { data },
  };
}

/**
 * Dispatched when fetching organization fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_ORGANIZATION_ERROR passing the error
 */
export function fetchOrganizationFailed(error) {
  return {
    type: FETCH_ORGANIZATION_ERROR,
    payload: { error },
  };
}

/**
 * Create organization, this action starts the request saga
 *
 * @return {object} An action object with a type of CREATE_ORGANIZATION
 */
export function createOrganization({
  userId,
  name,
  location,
  shippingAddress,
}) {
  return {
    type: CREATE_ORGANIZATION,
    payload: { userId, name, location, shippingAddress },
  };
}

/**
 * Dispatched when the organization is created by the request saga
 *
 * @param  {object} organization created organization info
 *
 * @return {object} An action object with a type of CREATE_ORGANIZATION_SUCCESS passing the organization
 */
export function createOrganizationSucceeded({ data }) {
  return {
    type: CREATE_ORGANIZATION_SUCCESS,
    payload: { data },
  };
}

/**
 * Dispatched when creating organization fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CREATE_ORGANIZATION_ERROR passing the error
 */
export function createOrganizationFailed(error) {
  return {
    type: CREATE_ORGANIZATION_ERROR,
    payload: { error },
  };
}

/**
 * Update organization, this action starts the request saga
 *
 * @return {object} An action object with a type of UPDATE_ORGANIZATION
 */
export function updateOrganization({ id, name, location, shippingAddress }) {
  return {
    type: UPDATE_ORGANIZATION,
    payload: {
      id,
      name,
      location,
      shippingAddress,
    },
  };
}

/**
 * Dispatched when the organization is updated by the request saga
 *
 * @param  {object} organization updated organization info
 *
 * @return {object} An action object with a type of UPDATE_ORGANIZATION_SUCCESS passing the organization
 */
export function updateOrganizationSucceeded({ data }) {
  return {
    type: UPDATE_ORGANIZATION_SUCCESS,
    payload: { data },
  };
}

/**
 * Dispatched when updating organization fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of UPDATE_ORGANIZATION_ERROR passing the error
 */
export function updateOrganizationFailed(error) {
  return {
    type: UPDATE_ORGANIZATION_ERROR,
    payload: { error },
  };
}
