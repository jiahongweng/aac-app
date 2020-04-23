import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { register } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import saga from './saga';
import Register from './Register';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});
const mapDispatchToProps = (dispatch) => ({
  registerUser: ({ email, password, name }) =>
    dispatch(register({ email, password, name })),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'register', saga });

export default compose(withSaga, withConnect)(Register);
