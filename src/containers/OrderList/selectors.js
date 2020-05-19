import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectOrderList = (state) => state.orderList || initialState;
const makeSelectOrders = () =>
  createSelector(selectOrderList, (orderListState) => orderListState.orders);
const makeSelectNeedRefresh = () =>
  createSelector(
    selectOrderList,
    (orderListState) => orderListState.needRefresh,
  );

export { selectOrderList, makeSelectOrders, makeSelectNeedRefresh };
