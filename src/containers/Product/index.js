import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { initProduct, fetchProduct, createProduct } from './actions';
import { makeselectProduct } from './selectors';
import saga from './saga';
import ProductModal from './ProductModal';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  product: makeselectProduct(),
});
const mapDispatchToProps = (dispatch) => ({
  initProduct: () => dispatch(initProduct()),
  fetchSelectedProduct: ({ styleId }) => dispatch(fetchProduct({ styleId })),
  createNewProduct: ({
    styleId,
    styleName,
    styleImage,
    brandName,
    title,
    description,
  }) =>
    dispatch(
      createProduct({
        styleId,
        styleName,
        styleImage,
        brandName,
        title,
        description,
      }),
    ),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'product', saga });

export default compose(withRouter, withSaga, withConnect)(ProductModal);
