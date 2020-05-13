import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProduct = (state) => state.product || initialState;
const makeselectProduct = () =>
  createSelector(selectProduct, (productState) => productState.product);

export { selectProduct, makeselectProduct };
