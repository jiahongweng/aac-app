/* eslint-disable no-restricted-properties */
/* eslint-disable no-restricted-globals */
import fpe from 'node-fpe';
import { omit } from 'lodash';
import { PAGE_PER_NUM } from './constants';

const userWithoutPassword = (user) => omit(user.dataValues, ['password']);

const parseRequestQuery = (requestQuery) => {
  const { page: pageStr, limit: limitStr } = requestQuery;
  let page = parseInt(pageStr, 10);
  let limit = parseInt(limitStr, 10);

  if (isNaN(page)) page = 0;
  if (isNaN(limit)) limit = PAGE_PER_NUM;

  return {
    page,
    limit,
  };
};

const generateOrderId = (scrambler = 'aac-secret', length = 14) => {
  const cipher = fpe({ password: scrambler });

  let now = Date.now().toString();
  // pad with additional random digits
  if (now.length < length) {
    const pad = length - now.length;
    now += Math.floor(
      Math.pow(10, pad - 1) +
        Math.random() * (Math.pow(10, pad) - Math.pow(10, pad - 1) - 1),
    ).toString();
  }
  now = cipher.encrypt(now);

  // split into xxxx-xxxxxx-xxxx format
  return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-');
};

export { userWithoutPassword, parseRequestQuery, generateOrderId };
