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

/**
 * Fetch organizations, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_ORGANIZATIONS
 */
export function fetchOrganizations({ order, orderBy, page, limit }) {
  return {
    type: FETCH_ORGANIZATIONS,
    payload: { order, orderBy, page, limit },
  };
}

/**
 * Dispatched when the organizations are fetched by the request saga
 *
 * @param  {object} organizations organizations info
 *
 * @return {object} An action object with a type of FETCH_ORGANIZATIONS_SUCCESS passing the organizations
 */
export function fetchOrganizationsSucceeded({ data }) {
  return {
    type: FETCH_ORGANIZATIONS_SUCCESS,
    payload: { result: data },
  };
}

/**
 * Dispatched when fetching organizations fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_ORGANIZATIONS_ERROR passing the error
 */
export function fetchOrganizationsFailed(error) {
  return {
    type: FETCH_ORGANIZATIONS_ERROR,
    payload: { error },
  };
}

/**
 * Delete organization, this action starts the request saga
 *
 * @return {object} An action object with a type of DELETE_ORGANIZATION
 */
export function deleteOrganization({ id }) {
  return {
    type: DELETE_ORGANIZATION,
    payload: { id },
  };
}

/**
 * Dispatched when the organization is deleted by the request saga
 *
 * @param  {object} id deletedId info
 *
 * @return {object} An action object with a type of DELETE_ORGANIZATION_SUCCESS passing the deletedId
 */
export function deleteOrganizationSucceeded({ data: { deletedId } }) {
  return {
    type: DELETE_ORGANIZATION_SUCCESS,
    payload: { deletedId },
  };
}

/**
 * Dispatched when deleting organization fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of DELETE_ORGANIZATION_ERROR passing the error
 */
export function deleteOrganizationFailed(error) {
  return {
    type: DELETE_ORGANIZATION_ERROR,
    payload: { error },
  };
}

/**
 * Delete organizations, this action starts the request saga
 *
 * @return {object} An action object with a type of DELETE_ORGANIZATIONS
 */
export function deleteOrganizations({ selectedIds }) {
  return {
    type: DELETE_ORGANIZATIONS,
    payload: { selectedIds },
  };
}

/**
 * Dispatched when the organizations are deleted by the request saga
 *
 * @param  {object} deletedIds deletedIds info
 *
 * @return {object} An action object with a type of DELETE_ORGANIZATIONS_SUCCESS passing the deletedIds
 */
export function deleteOrganizationsSucceeded({ deletedIds }) {
  return {
    type: DELETE_ORGANIZATIONS_SUCCESS,
    payload: { deletedIds },
  };
}

/**
 * Dispatched when deleting organizations fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of DELETE_ORGANIZATIONS_ERROR passing the error
 */
export function deleteOrganizationsFailed(error) {
  return {
    type: DELETE_ORGANIZATIONS_ERROR,
    payload: { error },
  };
}
