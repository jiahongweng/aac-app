import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { fetchUsers, deleteUser, deleteUsers } from './actions';
import { makeSelectUsers, makeSelectNeedRefresh } from './selectors';
import saga from './saga';
import UserList from './UserList';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  users: makeSelectUsers(),
  needRefresh: makeSelectNeedRefresh(),
});
const mapDispatchToProps = (dispatch) => ({
  fetchUserList: ({ order, orderBy, page, limit }) =>
    dispatch(fetchUsers({ order, orderBy, page, limit })),
  deleteSelectedUser: ({ _id }) => dispatch(deleteUser({ _id })),
  deleteSelectedUsers: ({ selectedIds }) =>
    dispatch(deleteUsers({ selectedIds })),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'userList', saga });

export default compose(withSaga, withConnect)(UserList);
