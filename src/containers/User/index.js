import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { fetchUser, createUser, updateUser } from './actions';
import { makeSelectUser } from './selectors';
import saga from './saga';
import UserModal from './UserModal';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  user: makeSelectUser(),
});
const mapDispatchToProps = (dispatch) => ({
  fetchSelectedUser: ({ id }) => dispatch(fetchUser({ id })),
  createNewUser: ({
    email,
    password,
    firstName,
    lastName,
    phone,
    role,
    status,
  }) =>
    dispatch(
      createUser({ email, password, firstName, lastName, phone, role, status }),
    ),
  updateSelectedUser: ({
    id,
    email,
    password,
    firstName,
    lastName,
    phone,
    role,
    status,
  }) =>
    dispatch(
      updateUser({
        id,
        email,
        password,
        firstName,
        lastName,
        phone,
        role,
        status,
      }),
    ),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'user', saga });

export default compose(withRouter, withSaga, withConnect)(UserModal);
