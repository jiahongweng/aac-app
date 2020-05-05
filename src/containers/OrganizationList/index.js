import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { fetchOrganizations, deleteOrganization } from './actions';
import { makeSelectOrganizations, makeSelectNeedRefresh } from './selectors';
import saga from './saga';
import OrganizationList from './OrganizationList';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  organizations: makeSelectOrganizations(),
  needRefresh: makeSelectNeedRefresh(),
});
const mapDispatchToProps = (dispatch) => ({
  fetchOrganizationList: ({ order, orderBy, page, limit }) =>
    dispatch(fetchOrganizations({ order, orderBy, page, limit })),
  deleteSelectedOrganization: ({ id }) => dispatch(deleteOrganization({ id })),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'organizationList', saga });

export default compose(withSaga, withConnect)(OrganizationList);
