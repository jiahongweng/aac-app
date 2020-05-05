import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectOrganizationList = (state) =>
  state.organizationList || initialState;
const makeSelectOrganizations = () =>
  createSelector(
    selectOrganizationList,
    (organizationListState) => organizationListState.organizations,
  );
const makeSelectNeedRefresh = () =>
  createSelector(
    selectOrganizationList,
    (organizationListState) => organizationListState.needRefresh,
  );

export {
  selectOrganizationList,
  makeSelectOrganizations,
  makeSelectNeedRefresh,
};
