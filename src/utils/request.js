import axios from 'axios';
import { API_BASE } from 'utils/constants';

export const makeUrlQueryParams = (queryCollection) => {
  const queryString = queryCollection
    .map((segment) => `${Object.keys(segment)[0]}=${Object.values(segment)[0]}`)
    .join('&');

  return `?${queryString}`;
};

export const makeJsonRequestOptions = ({
  method,
  requestUrlPath,
  headers,
  data,
  ...rest
}) => ({
  method,
  url: `${API_BASE}/${requestUrlPath}`,
  headers: {
    'Content-Type': 'application/json',
    ...headers,
  },
  ...(data ? { data } : {}),
  ...rest,
});

/**
 * Requests a URL, returning a promise
 *
 * @param  {object} [options] The options we want to pass to "axios"
 *
 * @return {object}           The response data
 */
const request = (options) => axios(options);

export default request;
