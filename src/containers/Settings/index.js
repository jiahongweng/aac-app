import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { updateAccount } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import saga from './saga';
import Account from './Account';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});
const mapDispatchToProps = (dispatch) => ({
  updateUserAccount: ({
    id,
    firstName,
    lastName,
    phone,
    password,
    oldPassword,
  }) =>
    dispatch(
      updateAccount({ id, firstName, lastName, phone, password, oldPassword }),
    ),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'account', saga });

export default compose(withSaga, withConnect)(Account);
