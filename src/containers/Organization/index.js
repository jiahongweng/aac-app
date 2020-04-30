import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { updateOrganization } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import saga from './saga';
import Organization from './Organization';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});
const mapDispatchToProps = (dispatch) => ({
  updateUserOrganization: ({ id, name, location, shippingAddress }) =>
    dispatch(updateOrganization({ id, name, location, shippingAddress })),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'organization', saga });

export default compose(withSaga, withConnect)(Organization);
