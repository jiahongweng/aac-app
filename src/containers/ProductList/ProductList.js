import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import ProductModal from 'containers/Product';
import { NotificationManager } from 'components/common/notifications';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Breadcrumb } from 'components/navs';
import { ListPagination } from 'components/pagination';
import { ROLES } from 'utils/constants';
import { ProductCard } from 'components/cards';
import { DEFAULT_PAGE_SIZE } from './constants';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      needRefresh: false,
      modalOpen: false,
      styleId: null,
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  onChangePage = (page) => {
    this.setState(
      {
        page: page - 1,
      },
      () => this.fetchProducts(),
    );
  };

  fetchProducts = () => {
    const { page, pageSize: limit } = this.state;
    this.props.fetchProductList({
      page,
      limit,
    });
  };

  openModal = (styleId = null) => {
    this.setState({ styleId });
    this.toggleModal();
  };

  toggleModal = (needRefresh = false) => {
    this.setState((prevState) => ({
      ...prevState,
      modalOpen: !prevState.modalOpen,
      needRefresh,
    }));
  };

  render() {
    const {
      currentUser: { data: currentUserData },
      products: { loading, error, data = [], page, total, limit },
      match,
    } = this.props;
    const { modalOpen, styleId } = this.state;

    if (ROLES.ADMIN !== currentUserData.role) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    if (error) {
      NotificationManager.error(error.message, 'Error');
    }

    return loading ? (
      <div className="loading" />
    ) : (
      <>
        <Row>
          <Colxx xxs="auto">
            <Breadcrumb heading="products" match={match} />
          </Colxx>
          <Colxx>
            <div className="float-right mb-2">
              <Link
                to="/products/add-product"
                className="btn btn-primary btn-lg text-uppercase"
              >
                Add New
              </Link>
            </div>
          </Colxx>
          <Colxx xxs="12">
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          {data.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClickItem={() => this.openModal(product.styleId)}
            />
          ))}
          <ProductModal
            styleId={styleId}
            isOpen={modalOpen}
            toggle={this.toggleModal}
          />
          <ListPagination
            currentPage={page + 1}
            totalPage={Math.ceil(total / limit)}
            onChangePage={(i) => this.onChangePage(i)}
          />
        </Row>
      </>
    );
  }
}

ProductList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  fetchProductList: PropTypes.func.isRequired,
  // deleteSelectedProduct: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default ProductList;
