import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { NavItem, Row } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';
import ProductModal from 'containers/Product';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { NotificationManager } from 'components/common/notifications';
import ApplicationMenu from 'components/common/ApplicationMenu';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Breadcrumb } from 'components/navs';
import { ProductCard } from 'components/cards';
import { ListPagination } from 'components/pagination';
import injectSaga from 'utils/injectSaga';
import { ROLES } from 'utils/constants';
import { fetchSsaProducts } from './actions';
import { makeSelectSsaProducts, makeSelectNeedRefresh } from './selectors';
import { DEFAULT_PAGE_SIZE } from './constants';
import { ssaProductListMainSaga as saga } from './saga';

class AddProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      needRefresh: false,
      searchKey: '',
      filterBrannd: '',
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
    const {
      searchKey: search,
      filterBrannd: brand,
      page,
      pageSize: limit,
    } = this.state;
    this.props.fetchSsaProductList({
      search,
      brand,
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

  onSearchProducts = (e) => {
    e.persist();

    if (e.key === 'Enter') {
      const searchKey = e.target.value;

      this.setState({ searchKey, filterBrannd: '', page: 0 }, () =>
        this.fetchProducts(),
      );
    }
  };

  onSelectBrandFilter = (filter) => {
    if (filter) {
      this.setState({ filterBrannd: filter, page: 0 }, () =>
        this.fetchProducts(),
      );
    }
  };

  render() {
    const {
      currentUser: { data: currentUserData },
      ssaProducts: {
        loading,
        error,
        data = [],
        filters = {},
        page,
        total,
        limit,
      },
      match,
    } = this.props;
    const { modalOpen, styleId, searchKey, filterBrannd } = this.state;

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
        <Row className="app-row">
          <Colxx sm="auto">
            <Breadcrumb heading="add-product" match={match} />
          </Colxx>
          <Colxx>
            <div className="text-zero top-right-button-container d-flex align-items-center mb-2">
              <div className="search-sm d-inline-block flex-fill m-2">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  className="w-100"
                  placeholder="Search"
                  defaultValue={searchKey}
                  onKeyPress={(e) => this.onSearchProducts(e)}
                />
              </div>
              <Link
                to="/products"
                className="btn btn-primary btn-lg text-uppercase"
              >
                Done
              </Link>
            </div>
          </Colxx>
          <Colxx xxs="12">
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row className="app-row">
          {data.map((product) => (
            <ProductCard
              key={product.styleId}
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
        <ApplicationMenu>
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <div className="p-4">
              <p className="text-muted text-small">Brands</p>
              <ul className="list-unstyled mb-5">
                {Object.keys(filters).map((filter) => (
                  <NavItem
                    key={filter}
                    className={classnames('py-1', {
                      active: filter === filterBrannd,
                    })}
                  >
                    <NavLink
                      to="#"
                      onClick={() => this.onSelectBrandFilter(filter)}
                      location={{}}
                    >
                      <i className="simple-icon-check" />
                      <span>{filter}</span>
                      <span className="float-right">{filters[filter]}</span>
                    </NavLink>
                  </NavItem>
                ))}
              </ul>
            </div>
          </PerfectScrollbar>
        </ApplicationMenu>
      </>
    );
  }
}

AddProducts.propTypes = {
  currentUser: PropTypes.object.isRequired,
  ssaProducts: PropTypes.object.isRequired,
  fetchSsaProductList: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  ssaProducts: makeSelectSsaProducts(),
  needRefresh: makeSelectNeedRefresh(),
});
const mapDispatchToProps = (dispatch) => ({
  fetchSsaProductList: ({ search, brand, page, limit }) =>
    dispatch(fetchSsaProducts({ search, brand, page, limit })),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'ssaProducts', saga });

export default compose(withSaga, withConnect)(AddProducts);
