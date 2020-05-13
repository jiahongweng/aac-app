import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { fetchProducts, deleteProduct } from './actions';
import { makeSelectProducts, makeSelectNeedRefresh } from './selectors';
import { productListMainSaga as saga } from './saga';
import ProductList from './ProductList';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  products: makeSelectProducts(),
  needRefresh: makeSelectNeedRefresh(),
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductList: ({ order, orderBy, page, limit }) =>
    dispatch(fetchProducts({ order, orderBy, page, limit })),
  deleteSelectedProduct: ({ id }) => dispatch(deleteProduct({ id })),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'productList', saga });

export default compose(withSaga, withConnect)(ProductList);
