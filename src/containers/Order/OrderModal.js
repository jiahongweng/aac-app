import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { get, has, pickBy } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Row,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Table,
  Button,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Badge,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import confirm from 'reactstrap-confirm';
import classnames from 'classnames';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { makeSelectProduct } from 'containers/Product/selectors';
import { initProduct } from 'containers/Product/actions';
import ProductModal from 'containers/Product';
import injectSaga from 'utils/injectSaga';
import {
  ORDER_SCHEMA,
  ACTIONS,
  SS_ACTIVEWARE,
  ROLES,
  ORDER_STATUS,
  ORDER_STATUSES,
  SUCCESS_MESSAGES,
} from 'utils/constants';
import { NotificationManager } from 'components/common/notifications';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikDatePicker, FormikCustomRadioGroup } from 'components/form';
import { ProductColorSwatch } from 'components/swatches';
import { initOrder, fetchOrder, updateOrder, deleteOrder } from './actions';
import { makeSelectOrder } from './selectors';
import { ORDER_ACTIONS } from './constants';
import { orderMainSaga as saga } from './saga';

const orderTypeSelectOptions = [
  { value: 'individual', label: 'Individual' },
  { value: 'bulk', label: 'Bulk' },
];

class OrderModal extends Component {
  constructor(props) {
    super(props);

    this.orderDetailFormRef = createRef();
    this.orderItemsFormRef = createRef();
    this.state = {
      action: ORDER_ACTIONS.NONE,
      productModal: {
        isOpen: false,
      },
      activeTab: '1',
      lightbox: {
        isOpen: false,
        color: null,
        index: 0,
      },
    };
  }

  componentDidUpdate(prevProps) {
    const {
      currentOrder: { loading: prevLoading },
    } = prevProps;
    const {
      isOpen,
      currentOrder: { loading, error },
      toggle,
    } = this.props;
    const { action } = this.state;

    if (isOpen && prevLoading && !loading && action !== ORDER_ACTIONS.NONE) {
      if (error) {
        NotificationManager.error(error.message, 'Error');
      } else if (action === ORDER_ACTIONS.DELETE) {
        NotificationManager.warning(
          SUCCESS_MESSAGES.DELETE_ORDER_SUCCESS,
          'Note',
        );
        toggle(null, true);
      } else if (
        action === ORDER_ACTIONS.UPDATE_DETAILS ||
        action === ORDER_ACTIONS.UPDATE_ITEMS
      ) {
        NotificationManager.success(
          SUCCESS_MESSAGES.UPDATE_ORDER_SUCCESS,
          'Success',
        );
        toggle(null, true);
      }
    }
    return false;
  }

  onOpened = () => {
    const { orderId, styleId, fetchSelectedOrder } = this.props;

    this.setState({ action: ORDER_ACTIONS.FETCH }, () => {
      fetchSelectedOrder({ orderId, styleId });
    });
  };

  onClosed = () => {
    this.props.initOrder();
    this.props.initOrderProduct();
  };

  onSelectProductColor = (color) => {
    this.setState({
      lightbox: {
        isOpen: true,
        color,
        index: 0,
      },
    });
  };

  toggleProductModal = (e) => {
    if (e) e.persist();

    this.setState((prevState) => ({
      productModal: {
        ...prevState.productModal,
        isOpen: !prevState.productModal.isOpen,
      },
    }));
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onUpdateOrderDetail = async () => {
    if (this.orderDetailFormRef.current) {
      await this.orderDetailFormRef.current.submitForm();
      if (this.orderDetailFormRef.current.isValid) {
        const { orderId, updateSelectedOrder } = this.props;
        const { type, dueDate, note } = this.orderDetailFormRef.current.values;

        this.setState({ action: ORDER_ACTIONS.UPDATE_DETAILS }, () => {
          updateSelectedOrder({ orderId, type, dueDate, note });
        });
      }
    }
  };

  onUpdateOrderItems = () => {
    if (this.orderItemsFormRef.current) {
      const { orderId, updateSelectedOrder } = this.props;
      const { values } = this.orderItemsFormRef.current;
      const productFormValues = pickBy(values, (value) => value);

      if (!Object.keys(productFormValues).length) {
        NotificationManager.error(
          'Please select a number of products',
          'Error',
        );
      } else {
        this.setState({ action: ORDER_ACTIONS.UPDATE_ITEMS }, () => {
          updateSelectedOrder({ orderId, products: { ...productFormValues } });
        });
      }
    }
  };

  onDeleteOrder = async () => {
    const confirmResult = await confirm({
      title: <span className="text-danger">Delete Confirmation</span>,
      message: 'Would you like to delete this order from the list?',
      confirmText: 'Confirm',
    });

    if (confirmResult) {
      const { orderId, deleteSelectedOrder } = this.props;

      this.setState({ action: ORDER_ACTIONS.DELETE }, () => {
        deleteSelectedOrder({ orderId });
      });
    }
  };

  renderOrderDetails = () => {
    const {
      currentUser: {
        data: { role },
      },
      currentOrder: { loading, data: orderData },
    } = this.props;
    const { action } = this.state;

    if (orderData) {
      const {
        orderId,
        status: orderStatus,
        type = 'individual',
        dueDate,
        note,
        style: { styleName, brandName, title },
      } = orderData;
      const editable =
        role === ROLES.CLIENT && orderStatus === ORDER_STATUS.CREATED;

      return (
        <Row>
          <Colxx xxs="12">
            <Table striped>
              <tbody>
                <tr>
                  <td>Order #</td>
                  <td>{orderId}</td>
                </tr>
                <tr>
                  <td>Product</td>
                  <td>
                    <NavLink
                      onClick={(e) => {
                        this.toggleProductModal(e);
                      }}
                      to="#"
                    >
                      {`${title} - ${brandName} - ${styleName}`}
                    </NavLink>
                  </td>
                </tr>
                <tr>
                  <td>Order Status</td>
                  <td>{ORDER_STATUSES[orderStatus].name}</td>
                </tr>
                {editable ? (
                  <tr>
                    <td colSpan="2">
                      <Formik
                        innerRef={this.orderDetailFormRef}
                        enableReinitialize
                        initialValues={{
                          type,
                          dueDate: dueDate ? moment(dueDate).toDate() : null,
                          note: note || '',
                        }}
                        validationSchema={ORDER_SCHEMA}
                        onSubmit={() => {}}
                      >
                        {({ values, setFieldValue, setFieldTouched }) => (
                          <Form
                            className="av-tooltip tooltip-label-bottom"
                            autoComplete="off"
                          >
                            <Row>
                              <Colxx xs="12" lg="6" className="mt-4 mb-2">
                                <FormGroup>
                                  <Label className="d-block">Order Type</Label>
                                  <FormikCustomRadioGroup
                                    inline
                                    name="type"
                                    value={values.type}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    options={orderTypeSelectOptions}
                                  />
                                </FormGroup>
                              </Colxx>
                            </Row>
                            <Row>
                              <Colxx xs="12" lg="6" className="mb-2">
                                <FormGroup className="has-float-label">
                                  <Label>Due Date</Label>
                                  <FormikDatePicker
                                    name="dueDate"
                                    value={values.dueDate}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                  />
                                  <ErrorMessage
                                    name="dueDate"
                                    className="invalid-feedback d-block"
                                    component="div"
                                  />
                                </FormGroup>
                              </Colxx>
                            </Row>
                            <Row>
                              <Colxx xs="12" lg="6" className="mb-2">
                                <FormGroup className="has-float-label">
                                  <Label className="d-block">
                                    Additional Note
                                  </Label>
                                  <Field
                                    className="form-control"
                                    type="text"
                                    component="textarea"
                                    name="note"
                                    rows="8"
                                  />
                                </FormGroup>
                              </Colxx>
                            </Row>
                          </Form>
                        )}
                      </Formik>
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr>
                      <td>Order Type</td>
                      <td>
                        {
                          orderTypeSelectOptions.find(
                            (item) => item.value === type,
                          ).label
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Due Date</td>
                      <td>
                        {dueDate ? moment(dueDate).format('MM.DD.YYYY') : null}
                      </td>
                    </tr>
                    <tr>
                      <td>Additional Note</td>
                      <td>{note || 'N/A'}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </Colxx>
          {editable && (
            <Colxx xxs="12" className="d-flex justify-content-end">
              <Button
                type="button"
                color="primary"
                className={`btn-shadow btn-multiple-state ${
                  loading && action === ORDER_ACTIONS.UPDATE_DETAILS
                    ? 'show-spinner'
                    : ''
                }`}
                onClick={this.onUpdateOrderDetail}
                size="lg"
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">Save</span>
              </Button>
            </Colxx>
          )}
        </Row>
      );
    }

    return null;
  };

  renderOrderItems = () => {
    const {
      currentUser: {
        data: { role },
      },
      currentOrder: { loading, data: orderData },
      currentOrderProduct: {
        loading: productLoading = true,
        data: orderProductData,
      },
    } = this.props;
    const { action } = this.state;

    if (orderData && orderProductData) {
      const editable =
        role === ROLES.CLIENT && orderData.status === ORDER_STATUS.CREATED;
      const tableRows = Object.keys(orderProductData.details);
      const tableColumns = Object.values(orderProductData.details).reduce(
        (accur, item) => {
          Object.keys(item.sizes).forEach((size) => {
            // eslint-disable-next-line no-param-reassign
            accur = accur.includes(size) ? accur : [...accur, size];
          });
          return accur;
        },
        [],
      );
      const initialValues = {};
      tableRows.forEach((color) =>
        tableColumns.forEach((size) => {
          const { sku = null } = get(
            orderProductData.details,
            `${color}.sizes.${size}`,
            {},
          );
          if (sku) {
            initialValues[sku] = get(orderData.products, sku, '');
          }
        }),
      );

      return productLoading ? (
        <div className="loading" />
      ) : (
        <Row>
          <Colxx xxs="12">
            <Formik
              innerRef={this.orderItemsFormRef}
              enableReinitialize
              initialValues={initialValues}
              onSubmit={() => {}}
            >
              {({ values }) => (
                <Form autoComplete="off">
                  <Table responsive borderless>
                    <thead>
                      <tr>
                        <th scope="col">Color</th>
                        {tableColumns.map((sizeColumn) => (
                          <th
                            scope="col"
                            key={`th-${sizeColumn}`}
                            className="text-center"
                          >
                            {sizeColumn}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((colorRow) => {
                        const {
                          color,
                          colorName,
                          colorSwatchImage,
                          colorSwatchTextColor,
                          sizes,
                        } = orderProductData.details[colorRow];

                        return (
                          <tr key={`tr-color-${colorRow}`}>
                            <td>
                              <ProductColorSwatch
                                color={color}
                                colorName={colorName}
                                textColor={colorSwatchTextColor}
                                swatchImage={colorSwatchImage}
                                onSelectSwatch={this.onSelectProductColor}
                              />
                            </td>
                            {tableColumns.map((sizeColumn) => {
                              const { sku = null } = sizes[sizeColumn] || {};

                              return (
                                <td
                                  key={`td-${colorRow}-${sizeColumn}`}
                                  className={classnames({
                                    'text-center': !editable,
                                  })}
                                >
                                  {(() => {
                                    if (sku) {
                                      return editable ? (
                                        <Field
                                          className="form-control text-right"
                                          type="number"
                                          placeholder="N/A"
                                          value={values[sku]}
                                          name={sku}
                                          min="0"
                                        />
                                      ) : (
                                        <span
                                          className={classnames({
                                            'd-block pt-2 text-muted text-extra-small opacity-75': !values[
                                              sku
                                            ],
                                          })}
                                        >
                                          {values[sku] || 'N/A'}
                                        </span>
                                      );
                                    }

                                    return null;
                                  })()}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Form>
              )}
            </Formik>
          </Colxx>
          {editable && (
            <Colxx xxs="12" className="d-flex justify-content-end">
              <Button
                type="button"
                color="primary"
                className={`btn-shadow btn-multiple-state ${
                  loading && action === ORDER_ACTIONS.UPDATE_ITEMS
                    ? 'show-spinner'
                    : ''
                }`}
                onClick={this.onUpdateOrderItems}
                size="lg"
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">Save</span>
              </Button>
            </Colxx>
          )}
        </Row>
      );
    }

    return null;
  };

  renderLightBox = () => {
    const {
      currentOrderProduct: { data: orderProductData },
    } = this.props;
    const {
      lightbox: { isOpen = false, color = null, index = 0 },
    } = this.state;

    if (isOpen && orderProductData && color) {
      const {
        colorFrontImage = null,
        colorSideImage = null,
        colorBackImage = null,
      } = orderProductData.details[color];
      const lightboxImages = [];

      if (colorFrontImage) {
        lightboxImages.push(
          `${SS_ACTIVEWARE.CDN_BASE}/${colorFrontImage.replace('_fm', '_fl')}`,
        );
      }
      if (colorSideImage) {
        lightboxImages.push(
          `${SS_ACTIVEWARE.CDN_BASE}/${colorSideImage.replace('_fm', '_fl')}`,
        );
      }
      if (colorBackImage) {
        lightboxImages.push(
          `${SS_ACTIVEWARE.CDN_BASE}/${colorBackImage.replace('_fm', '_fl')}`,
        );
      }

      return (
        lightboxImages.length > 0 && (
          <Lightbox
            mainSrc={lightboxImages[index]}
            nextSrc={lightboxImages[(index + 1) % lightboxImages.length]}
            prevSrc={
              lightboxImages[
                (index + lightboxImages.length - 1) % lightboxImages.length
              ]
            }
            onCloseRequest={() =>
              this.setState((prevState) => ({
                lightbox: { ...prevState.lightbox, isOpen: false },
              }))
            }
            onMovePrevRequest={() =>
              this.setState((prevState) => ({
                lightbox: {
                  ...prevState.lightbox,
                  index:
                    (index + lightboxImages.length - 1) % lightboxImages.length,
                },
              }))
            }
            onMoveNextRequest={() =>
              this.setState((prevState) => ({
                lightbox: {
                  ...prevState.lightbox,
                  index: (index + 1) % lightboxImages.length,
                },
              }))
            }
          />
        )
      );
    }

    return null;
  };

  render() {
    const {
      isOpen,
      toggle,
      orderId,
      currentOrder: { loading, data: orderData },
      currentUser: {
        data: { role },
      },
    } = this.props;
    const {
      action,
      activeTab,
      productModal: { isOpen: isProductModalOpen },
    } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        onEnter={this.onOpened}
        onExit={this.onClosed}
        wrapClassName="modal-right"
        scrollable
        size="lg"
      >
        <ModalHeader toggle={toggle}>
          <span>Order #{orderId}</span>
          <Badge
            color={get(ORDER_STATUSES[get(orderData, 'status')], 'color')}
            className="px-2 mx-2 mt--1"
          >
            {get(ORDER_STATUSES[get(orderData, 'status')], 'name')}
          </Badge>
        </ModalHeader>
        {loading && !orderData ? (
          <div className="loading" />
        ) : (
          <>
            <ModalBody>
              <Row>
                <Colxx xxs="12">
                  <div className="d-flex flex-row justify-content-between mb-5">
                    <div className="d-flex flex-column w-70 mr-2 p-4 text-semi-muted bg-semi-muted">
                      <p className="mb-0 text-uppercase font-weight-bold">
                        {get(orderData, 'organization.name')}
                      </p>
                      <p className="mb-0 font-italic">
                        {get(orderData, 'organization.location.address1')},{' '}
                        {get(orderData, 'organization.location.address2')}
                        {get(orderData, 'organization.location.city')},{' '}
                        {get(orderData, 'organization.location.state')}{' '}
                        {get(orderData, 'organization.location.zipCode')}
                      </p>
                    </div>
                    <div className="d-flex w-30 flex-column text-right p-4 text-semi-muted bg-semi-muted">
                      <p className="mb-0 font-weight-bold">
                        {get(orderData, 'user.firstName')}{' '}
                        {get(orderData, 'user.lastName')}
                      </p>
                      <p className="mb-0">
                        {moment(get(orderData, 'dueDate')).format('MM.DD.YYYY')}
                      </p>
                    </div>
                  </div>
                </Colxx>
                <Colxx xxs="12">
                  <Nav tabs className="separator-tabs ml-0 mb-5">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === '1',
                          'nav-link': true,
                        })}
                        onClick={() => {
                          this.toggleTab('1');
                        }}
                        location={{}}
                        to="#"
                      >
                        Details
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === '2',
                          'nav-link': true,
                        })}
                        onClick={() => {
                          this.toggleTab('2');
                        }}
                        location={{}}
                        to="#"
                      >
                        Items
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === '3',
                          'nav-link': true,
                        })}
                        onClick={() => {
                          this.toggleTab('3');
                        }}
                        location={{}}
                        to="#"
                      >
                        Designs
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">{this.renderOrderDetails()}</TabPane>
                    <TabPane tabId="2">
                      {this.renderOrderItems()}
                      {this.renderLightBox()}
                    </TabPane>
                    <TabPane tabId="3"></TabPane>
                  </TabContent>
                </Colxx>
              </Row>
              {isProductModalOpen && (
                <ProductModal
                  styleId={get(orderData, 'styleId')}
                  mode={ACTIONS.NONE}
                  isOpen={isOpen}
                  initialize={false}
                  toggle={this.toggleProductModal}
                />
              )}
            </ModalBody>
            {(() => {
              if (
                role === ROLES.CLIENT &&
                has(orderData, 'status') &&
                get(orderData, 'status') === ORDER_STATUS.CREATED
              ) {
                return (
                  <ModalFooter>
                    <Button
                      color="secondary"
                      outline
                      onClick={toggle}
                      size="lg"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      color="danger"
                      className={`btn-shadow btn-multiple-state ${
                        loading && action === ORDER_ACTIONS.DELETE
                          ? 'show-spinner'
                          : ''
                      }`}
                      onClick={this.onDeleteOrder}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">Delete</span>
                    </Button>
                  </ModalFooter>
                );
              }
              return null;
            })()}
          </>
        )}
      </Modal>
    );
  }
}

OrderModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  orderId: PropTypes.string.isRequired,
  styleId: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
  currentOrder: PropTypes.object.isRequired,
  currentOrderProduct: PropTypes.object.isRequired,
  initOrder: PropTypes.func.isRequired,
  initOrderProduct: PropTypes.func.isRequired,
  fetchSelectedOrder: PropTypes.func.isRequired,
  updateSelectedOrder: PropTypes.func.isRequired,
  deleteSelectedOrder: PropTypes.func.isRequired,
};

OrderModal.defaultProps = {
  isOpen: false,
  toggle: () => {},
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentOrder: makeSelectOrder(),
  currentOrderProduct: makeSelectProduct(),
});
const mapDispatchToProps = (dispatch) => ({
  initOrder: () => dispatch(initOrder()),
  initOrderProduct: () => dispatch(initProduct()),
  fetchSelectedOrder: ({ orderId, styleId }) =>
    dispatch(fetchOrder({ orderId, styleId })),
  updateSelectedOrder: ({ orderId, ...rest }) =>
    dispatch(updateOrder({ orderId, ...rest })),
  deleteSelectedOrder: ({ orderId }) =>
    dispatch(
      deleteOrder({
        orderId,
      }),
    ),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'order', saga });

export default compose(withSaga, withConnect)(OrderModal);
