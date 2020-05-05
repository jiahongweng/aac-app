import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectOrganization = (state) => state.organization || initialState;
const makeselectOrganization = () =>
  createSelector(
    selectOrganization,
    (organizationState) => organizationState.organization,
  );

export { selectOrganization, makeselectOrganization };
