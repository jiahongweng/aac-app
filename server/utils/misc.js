/* eslint-disable no-restricted-globals */
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

export { userWithoutPassword, parseRequestQuery };
