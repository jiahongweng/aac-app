import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Button, Alert } from 'reactstrap';
import CreateOrderModal from 'containers/Order/CreateOrderModal';
import OrderModal from 'containers/Order/OrderModal';
import { NotificationManager } from 'components/common/notifications';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Breadcrumb } from 'components/navs';
import { ListPagination } from 'components/pagination';
import { ACTIONS, ROLES } from 'utils/constants';
import { OrderCard } from 'components/cards';
import { Link } from 'react-router-dom';
import { DEFAULT_PAGE_SIZE } from './constants';

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: ACTIONS.NONE,
      modalOpen: false,
      orderId: null,
      styleId: null,
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

  openModal = (e, mode, orderId = null, styleId = null) => {
    e.persist();

    this.setState({ mode, orderId, styleId }, () => {
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
      currentUser: {
        data: { role, organization },
      },
      orders: { loading, error, data = [], page, total, limit },
      match,
    } = this.props;
    const { mode, modalOpen, orderId, styleId } = this.state;

    if (error) {
      NotificationManager.error(error.message, 'Error');
    }

    return (
      <>
        <Row>
          <Colxx xxs="auto">
            <Breadcrumb heading="orders" match={match} />
          </Colxx>
          {role === ROLES.CLIENT && organization && (
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
          )}
          <Colxx xxs="12">
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {(() => {
          if (loading) {
            return <div className="loading" />;
          }
          if (organization || role === ROLES.ADMIN) {
            return (
              <Row>
                {data.map((order) => (
                  <OrderCard
                    key={order.orderId}
                    order={order}
                    onClickItem={(e) =>
                      this.openModal(
                        e,
                        ACTIONS.VIEW,
                        order.orderId,
                        order.styleId,
                      )
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
                {modalOpen && mode === ACTIONS.VIEW && (
                  <OrderModal
                    orderId={orderId}
                    styleId={styleId}
                    mode={ACTIONS.DELETE}
                    isOpen={modalOpen}
                    toggle={this.toggleModal}
                  />
                )}
              </Row>
            );
          }
          return (
            <Alert color="danger">
              You have no permission to create an order untilyou add your
              organization information. Please add your{' '}
              <Link to="/settings/organization">organization</Link> now.
            </Alert>
          );
        })()}
      </>
    );
  }
}

OrderList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  fetchOrderList: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default OrderList;
