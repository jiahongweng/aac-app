import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { login } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import saga from './saga';
import Login from './Login';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: ({ email, password }) => dispatch(login({ email, password })),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'login', saga });

export default compose(withSaga, withConnect)(Login);
