/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-const */
import { omit } from 'lodash';
import { PAGE_PER_NUM } from './constants';

const userWithoutPassword = (user) => omit(user.dataValues, ['password']);

const parseRequestQuery = (requestQuery) => {
  let query = {};
  const {
    page: pageStr,
    limit: limitStr,
    sizeMin: sizeMinStr,
    sizeMax: sizeMaxStr,
    priceMin: priceMinStr,
    priceMax: priceMaxStr,
    numRoomsMin: numRoomsMinStr,
    numRoomsMax: numRoomsMaxStr,
  } = requestQuery;
  let page = parseInt(pageStr, 10);
  let limit = parseInt(limitStr, 10);
  let sizeMin = parseInt(sizeMinStr, 10);
  let sizeMax = parseInt(sizeMaxStr, 10);
  let priceMin = parseInt(priceMinStr, 10);
  let priceMax = parseInt(priceMaxStr, 10);
  let numRoomsMin = parseInt(numRoomsMinStr, 10);
  let numRoomsMax = parseInt(numRoomsMaxStr, 10);

  if (isNaN(page)) page = 0;
  if (isNaN(limit)) limit = PAGE_PER_NUM;
  if (!isNaN(sizeMin)) query.floorAreaSize = { $gte: sizeMin };
  if (!isNaN(sizeMax))
    query.floorAreaSize = { ...query.floorAreaSize, $lte: sizeMax };
  if (!isNaN(priceMin)) query.pricePerMonth = { $gte: priceMin };
  if (!isNaN(priceMax))
    query.pricePerMonth = { ...query.pricePerMonth, $lte: priceMax };
  if (!isNaN(numRoomsMin)) query.numberOfRooms = { $gte: numRoomsMin };
  if (!isNaN(numRoomsMax))
    query.numberOfRooms = { ...query.numberOfRooms, $lte: numRoomsMax };

  return {
    page,
    limit,
    query,
  };
};

export { userWithoutPassword, parseRequestQuery };
