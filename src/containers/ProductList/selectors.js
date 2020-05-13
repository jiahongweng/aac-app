import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProductList = (state) => state.productList || initialState;
const makeSelectProducts = () =>
  createSelector(
    selectProductList,
    (productListState) => productListState.products,
  );
const makeSelectSsaProducts = () =>
  createSelector(
    selectProductList,
    (productListState) => productListState.ssaProducts,
  );
const makeSelectNeedRefresh = () =>
  createSelector(
    selectProductList,
    (productListState) => productListState.needRefresh,
  );

export {
  selectProductList,
  makeSelectProducts,
  makeSelectSsaProducts,
  makeSelectNeedRefresh,
};
