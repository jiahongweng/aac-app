import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMenu = (state) => state.menu || initialState;
const makeSelectContainerClassnames = () =>
  createSelector(selectMenu, (menuState) => menuState.containerClassnames);
const makeSelectMenuClickCount = () =>
  createSelector(selectMenu, (menuState) => menuState.menuClickCount);
const makeSelectMenuHasSubItems = () =>
  createSelector(selectMenu, (menuState) => menuState.selectedMenuHasSubItems);

export {
  selectMenu,
  makeSelectContainerClassnames,
  makeSelectMenuClickCount,
  makeSelectMenuHasSubItems,
};
