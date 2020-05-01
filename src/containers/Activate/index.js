import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { activateAccount } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import saga from './saga';
import Activate from './Activate';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => ({
  activate: ({ verificationCode }) =>
    dispatch(activateAccount({ verificationCode })),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'activate', saga });

export default compose(withSaga, withConnect)(Activate);
