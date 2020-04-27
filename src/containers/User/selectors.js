import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUser = (state) => state.user || initialState;
const makeSelectUser = () =>
  createSelector(selectUser, (userState) => userState.user);

export { selectUser, makeSelectUser };
