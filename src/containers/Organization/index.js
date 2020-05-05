import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import {
  initOrganization,
  fetchOrganization,
  createOrganization,
  updateOrganization,
} from './actions';
import { makeselectOrganization } from './selectors';
import saga from './saga';
import OrganizationModal from './OrganizationModal';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  organization: makeselectOrganization(),
});
const mapDispatchToProps = (dispatch) => ({
  initOrganization: () => dispatch(initOrganization()),
  fetchSelectedOrganization: ({ id }) => dispatch(fetchOrganization({ id })),
  createNewOrganization: ({ userId, name, location, shippingAddress }) =>
    dispatch(
      createOrganization({
        userId,
        name,
        location,
        shippingAddress,
      }),
    ),
  updateSelectedOrganization: ({ id, name, location, shippingAddress }) =>
    dispatch(
      updateOrganization({
        id,
        name,
        location,
        shippingAddress,
      }),
    ),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'organization', saga });

export default compose(withRouter, withSaga, withConnect)(OrganizationModal);
