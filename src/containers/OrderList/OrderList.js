import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Row, Button } from 'reactstrap';
import ProductModal from 'containers/Product';
import CreateOrderModal from 'containers/Order/CreateOrderModal';
import { NotificationManager } from 'components/common/notifications';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Breadcrumb } from 'components/navs';
import { ListPagination } from 'components/pagination';
import { ACTIONS } from 'utils/constants';
import { OrderCard } from 'components/cards';
import { DEFAULT_PAGE_SIZE } from './constants';

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: ACTIONS.NONE,
      modalOpen: false,
      // needRefresh: false,
      orderId: null,
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE,
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  onChangePage = (page) => {
    this.setState(
      {
        page: page - 1,
      },
      () => this.fetchOrders(),
    );
  };

  fetchOrders = () => {
    const { page, pageSize: limit } = this.state;
    this.props.fetchOrderList({
      page,
      limit,
    });
  };

  openModal = (e, mode, orderId = null) => {
    e.persist();

    this.setState({ mode, orderId }, () => {
      this.toggleModal(e);
    });
  };

  toggleModal = (e, needRefresh = false) => {
    if (e) e.persist();

    this.setState((prevState) => ({
      ...prevState,
      modalOpen: !prevState.modalOpen,
      mode: prevState.modalOpen ? ACTIONS.NONE : prevState.mode,
    }));

    if (needRefresh) {
      this.fetchOrders();
    }
  };

  render() {
    const {
      orders: { loading, error, data = [], page, total, limit },
      match,
    } = this.props;
    const { mode, modalOpen, orderId } = this.state;

    if (error) {
      NotificationManager.error(error.message, 'Error');
    }

    return (
      <>
        <Row>
          <Colxx xxs="auto">
            <Breadcrumb heading="orders" match={match} />
          </Colxx>
          <Colxx>
            <div className="float-right mb-2">
              <Button
                color="primary"
                size="lg"
                className="top-right-button text-uppercase"
                onClick={(e) => this.openModal(e, ACTIONS.CREATE)}
              >
                Add New
              </Button>
            </div>
          </Colxx>
          <Colxx xxs="12">
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {loading ? (
          <div className="loading" />
        ) : (
          <Row>
            {data.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                onClickItem={(e) =>
                  this.openModal(e, ACTIONS.EDIT, order.orderId)
                }
              />
            ))}
            <ListPagination
              currentPage={page + 1}
              totalPage={Math.ceil(total / limit)}
              onChangePage={(i) => this.onChangePage(i)}
            />
            {modalOpen && mode === ACTIONS.CREATE && (
              <CreateOrderModal
                mode={mode}
                isOpen={modalOpen}
                toggle={this.toggleModal}
              />
            )}
            {modalOpen && mode === ACTIONS.EDIT && (
              <ProductModal
                orderId={orderId}
                mode={ACTIONS.DELETE}
                isOpen={modalOpen}
                toggle={this.toggleModal}
              />
            )}
          </Row>
        )}
      </>
    );
  }
}

OrderList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  fetchOrderList: PropTypes.func.isRequired,
  deleteSelectedOrder: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default OrderList;
