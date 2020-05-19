import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { fetchOrders, deleteOrder } from './actions';
import { makeSelectOrders, makeSelectNeedRefresh } from './selectors';
import saga from './saga';
import OrderList from './OrderList';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  orders: makeSelectOrders(),
  needRefresh: makeSelectNeedRefresh(),
});
const mapDispatchToProps = (dispatch) => ({
  fetchOrderList: ({ order, orderBy, page, limit }) =>
    dispatch(fetchOrders({ order, orderBy, page, limit })),
  deleteSelectedOrder: ({ orderId }) => dispatch(deleteOrder({ orderId })),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'orderList', saga });

export default compose(withSaga, withConnect)(OrderList);
