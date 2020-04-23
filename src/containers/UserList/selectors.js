import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserList = (state) => state.userList || initialState;
const makeSelectUsers = () =>
  createSelector(selectUserList, (userListState) => userListState.users);
const makeSelectNeedRefresh = () =>
  createSelector(selectUserList, (userListState) => userListState.needRefresh);

export { selectUserList, makeSelectUsers, makeSelectNeedRefresh };
