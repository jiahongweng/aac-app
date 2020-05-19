import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectOrder = (state) => state.order || initialState;
const makeSelectOrder = () =>
  createSelector(selectOrder, (orderState) => orderState.order);

export { selectOrder, makeSelectOrder };
