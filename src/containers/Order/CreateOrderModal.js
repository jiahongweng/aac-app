import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { get, pickBy } from 'lodash';
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
} from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import Lightbox from 'react-image-lightbox';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchProducts } from 'containers/ProductList/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { makeSelectProducts } from 'containers/ProductList/selectors';
import ProductModal from 'containers/Product';
import injectSaga from 'utils/injectSaga';
import { ORDER_SCHEMA, ACTIONS, SS_ACTIVEWARE } from 'utils/constants';
import { NotificationManager } from 'components/common/notifications';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikDatePicker, FormikCustomRadioGroup } from 'components/form';
import { WizardTopNav, WizardBottomNav } from 'components/wizard';
import { ListPagination } from 'components/pagination';
import { ProductCard } from 'components/cards';
import { ProductColorSwatch } from 'components/swatches';
import { createOrder } from './actions';
import { makeSelectOrder } from './selectors';
import saga from './saga';
import { DEFAULT_PAGE_SIZE } from './constants';

const orderTypeSelectOptions = [
  { value: 'individual', label: 'Individual' },
  { value: 'bulk', label: 'Bulk' },
];

class CreateOrderModal extends Component {
  constructor(props) {
    super(props);

    this.orderFormRef = createRef();
    this.productFormRef = createRef();
    this.state = {
      productModal: {
        isOpen: false,
        styleId: null,
      },
      productList: {
        page: 0,
        pageSize: DEFAULT_PAGE_SIZE,
      },
      order: {
        selectedProduct: null,
        type: 'individual',
        dueDate: null,
        note: null,
        products: {},
        submitting: false,
      },
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
    const {
      order: { submitting },
    } = this.state;

    if (isOpen) {
      if (error) {
        NotificationManager.error(error.message, 'Error');
      } else if (prevLoading && !loading && submitting) {
        NotificationManager.success('You have created new order', 'Thank you!');
        toggle(null, true);
      }
    }
    return false;
  }

  onOpened = () => {
    this.fetchProducts();
  };

  onClosed = () => {};

  onClickWizardNext = async (goToNext, steps, step) => {
    // eslint-disable-next-line no-param-reassign
    step.isDone = true;

    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }

    const stepIndex = steps.indexOf(step);

    if (stepIndex === 0) {
      if (this.state.order.selectedProduct) {
        goToNext();
      } else {
        NotificationManager.error(
          'Please select a produt to create an order',
          'Error',
        );
      }
    } else if (stepIndex === 1) {
      if (this.orderFormRef.current && this.orderFormRef.current) {
        await this.orderFormRef.current.submitForm();
        if (this.orderFormRef.current.isValid) {
          const { type, dueDate, note } = this.orderFormRef.current.values;
          this.setState(
            (prevState) => ({
              order: {
                ...prevState.order,
                type,
                dueDate: moment(dueDate).format('YYYY-MM-DD'),
                note,
              },
            }),
            () => goToNext(),
          );
        }
      }
    } else if (stepIndex === 2) {
      if (this.productFormRef.current && this.productFormRef.current) {
        const { values } = this.productFormRef.current;
        const productFormValues = pickBy(values, (value) => value);

        if (!Object.keys(productFormValues).length) {
          NotificationManager.error(
            'Please select a number of products',
            'Error',
          );
        } else {
          this.setState(
            (prevState) => ({
              order: {
                ...prevState.order,
                products: {
                  ...productFormValues,
                },
                submitting: true,
              },
            }),
            () => {
              const {
                order: {
                  selectedProduct: { styleId },
                  type,
                  dueDate,
                  note,
                  products,
                },
              } = this.state;

              this.props.createNewOrder({
                userId: 2,
                organizationId: 11,
                styleId,
                type,
                dueDate,
                note,
                products,
              });
            },
          );
        }
      }
    }
  };

  onClickWizardPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }

    goToPrev();
  };

  onChangeProductListPage = (page) => {
    this.setState(
      (prevState) => ({
        productList: {
          ...prevState.productList,
          page: page - 1,
        },
      }),
      () => this.fetchProducts(),
    );
  };

  fetchProducts = () => {
    const {
      productList: { page, pageSize: limit },
    } = this.state;

    this.props.fetchProductList({
      page,
      limit,
    });
  };

  openProductModal = (e, styleId) => {
    e.persist();

    this.setState(
      (prevState) => ({ productModal: { ...prevState.productModal, styleId } }),
      () => {
        this.toggleProductModal(e);
      },
    );
  };

  toggleProductModal = (e, selectedProduct = null) => {
    if (e) e.persist();

    this.setState((prevState) => ({
      productModal: {
        ...prevState.productModal,
        isOpen: !prevState.productModal.isOpen,
      },
    }));

    if (selectedProduct) {
      this.setState((prevState) => ({
        order: { ...prevState.order, selectedProduct },
        lightbox: {
          isOpen: false,
          color: null,
          index: 0,
        },
      }));
    }
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

  renderProductsSelection = () => {
    const {
      products: { loading, data = [], page, total, limit },
    } = this.props;
    const {
      productModal: { isOpen, styleId },
      order: { selectedProduct },
    } = this.state;

    return loading ? (
      <div className="loading" />
    ) : (
      <Row>
        {data.map((product) => (
          <ProductCard
            key={product.styleId}
            product={product}
            isSelect={
              selectedProduct && product.styleId === selectedProduct.styleId
            }
            onClickItem={(e) => this.openProductModal(e, product.styleId)}
          />
        ))}
        <ListPagination
          currentPage={page + 1}
          totalPage={Math.ceil(total / limit)}
          onChangePage={(i) => this.onChangeProductListPage(i)}
        />
        {isOpen && (
          <ProductModal
            styleId={styleId}
            mode={ACTIONS.SELECT}
            isOpen={isOpen}
            toggle={this.toggleProductModal}
          />
        )}
      </Row>
    );
  };

  renderOrderOptions = () => {
    const {
      order: { selectedProduct, type, dueDate, note },
    } = this.state;

    if (selectedProduct) {
      return (
        <Formik
          innerRef={this.orderFormRef}
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
                <Colxx
                  xs="12"
                  md={{ size: 6, offset: 3 }}
                  className="mt-4 mb-2"
                >
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
                <Colxx xs="12" md={{ size: 6, offset: 3 }} className="mb-2">
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
                <Colxx xs="12" md={{ size: 6, offset: 3 }} className="mb-2">
                  <FormGroup className="has-float-label">
                    <Label className="d-block">Additional Note</Label>
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
      );
    }

    return null;
  };

  renderProductOptions = () => {
    const {
      order: { selectedProduct, products },
    } = this.state;

    if (selectedProduct) {
      const tableRows = Object.keys(selectedProduct.details);
      const tableColumns = Object.values(selectedProduct.details).reduce(
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
            selectedProduct.details,
            `${color}.sizes.${size}`,
            {},
          );
          if (sku) {
            initialValues[sku] = get(products, sku, '');
          }
        }),
      );

      return (
        <Formik
          innerRef={this.productFormRef}
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
                    } = selectedProduct.details[colorRow];

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
                            <td key={`td-${colorRow}-${sizeColumn}`}>
                              {sku && (
                                <Field
                                  className="form-control text-right"
                                  type="number"
                                  placeholder="N/A"
                                  value={values[sku]}
                                  name={sku}
                                  min="0"
                                />
                              )}
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
      );
    }

    return null;
  };

  renderLightBox = () => {
    const {
      order: { selectedProduct = null },
      lightbox: { isOpen = false, color = null, index = 0 },
    } = this.state;

    if (isOpen && selectedProduct && color) {
      const {
        colorFrontImage = null,
        colorSideImage = null,
        colorBackImage = null,
      } = selectedProduct.details[color];
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
      currentOrder: { loading },
    } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        onOpened={this.onOpened}
        onClosed={this.onClosed}
        wrapClassName="modal-right"
        scrollable
        size="full"
      >
        <Wizard>
          {({ step }) => (
            <>
              <ModalHeader toggle={toggle}>
                <span>Create Order</span>
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className="loading" />
                ) : (
                  <div className="wizard wizard-default">
                    <WizardTopNav
                      className="justify-content-center"
                      disableNav
                    />
                    <Steps>
                      <Step id="step1" name="Step 1" desc="Select product">
                        <div className="wizard-basic-step">
                          {this.renderProductsSelection()}
                        </div>
                      </Step>
                      <Step id="step2" name="Step 2" desc="Order information">
                        <div className="wizard-basic-step">
                          {this.renderOrderOptions()}
                        </div>
                      </Step>
                      <Step id="step3" name="Step 3" desc="Product options">
                        <div className="wizard-basic-step">
                          {this.renderProductOptions()}
                        </div>
                      </Step>
                      <Step id="step4" hideTopNav></Step>
                    </Steps>
                    {this.renderLightBox()}
                  </div>
                )}
              </ModalBody>
              {!loading && (
                <ModalFooter>
                  <WizardBottomNav
                    nextLabel={step.id === 'step3' ? 'Complete' : 'Next'}
                    onClickNext={this.onClickWizardNext}
                    onClickPrev={this.onClickWizardPrev}
                    className="justify-content-center"
                  />
                </ModalFooter>
              )}
            </>
          )}
        </Wizard>
      </Modal>
    );
  }
}

CreateOrderModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  currentUser: PropTypes.object.isRequired,
  currentOrder: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  fetchProductList: PropTypes.func.isRequired,
  createNewOrder: PropTypes.func.isRequired,
};

CreateOrderModal.defaultProps = {
  isOpen: false,
  toggle: () => {},
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  products: makeSelectProducts(),
  currentOrder: makeSelectOrder(),
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductList: ({ order, orderBy, page, limit }) =>
    dispatch(fetchProducts({ order, orderBy, page, limit })),
  createNewOrder: ({
    userId,
    organizationId,
    styleId,
    dueDate,
    note,
    products,
  }) =>
    dispatch(
      createOrder({
        userId,
        organizationId,
        styleId,
        dueDate,
        note,
        products,
      }),
    ),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'createOrder', saga });

export default compose(withSaga, withConnect)(CreateOrderModal);
