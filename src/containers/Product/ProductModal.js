import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Table,
} from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import { NotificationManager } from 'components/common/notifications';
import { Colxx } from 'components/common/CustomBootstrap';
import { ProductImagesCarousel } from 'components/carousel';
import { ProductColorSwatch } from 'components/swatches';
import { ACTIONS, SUCCESS_MESSAGES } from 'utils/constants';

const productImageCategories = [
  {
    id: 'front',
    label: 'Front',
  },
  {
    id: 'side',
    label: 'Side',
  },
  {
    id: 'back',
    label: 'Back',
  },
];

class ProductModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      selectedColor: null,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      product: { loading: prevLoading },
    } = prevProps;
    const {
      isOpen,
      mode,
      product: { loading, error },
      toggle,
    } = this.props;
    const { fetching } = this.state;

    if (isOpen) {
      if (error) {
        NotificationManager.error(error.message, 'Error');
      } else if (prevLoading && !loading) {
        if (!fetching) {
          if (mode === ACTIONS.CREATE) {
            NotificationManager.success(
              SUCCESS_MESSAGES.CREATE_PRODUCT_SUCCESS,
              'Success',
            );
            toggle(null);
          } else {
            NotificationManager.info(
              SUCCESS_MESSAGES.DELETE_PRODUCT_SUCCESS,
              'Note',
            );
            toggle(null, true);
          }
        } else {
          this.onFetchingDone();
        }
      }
    }
    return false;
  }

  onFetchingDone() {
    this.setState({ fetching: false });
  }

  onOpened = () => {
    const { fetchSelectedProduct, styleId } = this.props;

    this.setState({ fetching: true }, () => {
      fetchSelectedProduct({ styleId });
    });
  };

  onClosed = () => {
    this.props.initProduct();
    this.setState({ selectedColor: null });
  };

  onSubmit = () => {
    const {
      styleId,
      mode,
      toggle,
      createNewProduct,
      deleteSelectedProduct,
      product: { data: productData },
    } = this.props;

    if (mode === ACTIONS.CREATE) {
      const {
        styleName,
        styleImage,
        brandName,
        brandImage,
        title,
        description,
      } = productData;
      createNewProduct({
        styleId,
        styleName,
        styleImage,
        brandName,
        brandImage,
        title,
        description,
      });
    } else if (mode === ACTIONS.DELETE) {
      deleteSelectedProduct({ styleId });
    } else if (mode === ACTIONS.SELECT) {
      toggle(null, productData);
    }
  };

  onSelectProductColor = (color) => {
    this.setState({ selectedColor: color });
  };

  renderProductImages = () => {
    const {
      isOpen,
      product: {
        data: { styleImage, details: productData },
      },
    } = this.props;
    const { fetching, selectedColor } = this.state;
    const images = [];

    if (isOpen && !fetching && productData) {
      if (selectedColor) {
        productImageCategories.forEach((img) => {
          if (productData[`${selectedColor}`][`color${img.label}Image`]) {
            images.push({
              ...img,
              src: productData[`${selectedColor}`][`color${img.label}Image`],
            });
          }
        });
      }

      // Include model image
      images.push({
        id: 'model',
        label: 'Model',
        src: styleImage,
      });

      return <ProductImagesCarousel color={selectedColor} images={images} />;
    }

    return null;
  };

  renerProductColorSwatches = () => {
    const {
      isOpen,
      product: {
        data: { details: productData },
      },
    } = this.props;
    const { fetching } = this.state;

    if (isOpen && !fetching && productData) {
      return Object.values(
        productData,
      ).map(({ color, colorName, colorSwatchTextColor, colorSwatchImage }) => (
        <ProductColorSwatch
          key={`${color}-${colorName}`}
          color={color}
          colorName={colorName}
          textColor={colorSwatchTextColor}
          swatchImage={colorSwatchImage}
          onSelectSwatch={this.onSelectProductColor}
        />
      ));
    }

    return null;
  };

  renderProductSpecs = () => {
    const showQty = false; // Do not show QTY option right now
    const {
      isOpen,
      product: {
        data: { specs: specsData, details: productData },
      },
    } = this.props;
    const { fetching, selectedColor } = this.state;

    if (isOpen && !fetching && specsData) {
      const tableColumns = Object.values(specsData).reduce((accur, item) => {
        Object.keys(item).forEach((size) => {
          // eslint-disable-next-line no-param-reassign
          accur = accur.includes(size) ? accur : [...accur, size];
        });
        return accur;
      }, []);

      return (
        <Table responsive striped>
          <thead>
            <tr>
              <th scope="col">#</th>
              {tableColumns.map((sizeColumn) => (
                <th scope="col" key={`th-${sizeColumn}`}>
                  {sizeColumn}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(specsData).map((spec, index) => (
              <tr key={`tr-spec-${index}`}>
                <td>{spec}</td>
                {tableColumns.map((sizeColumn) => (
                  <td key={`td-${sizeColumn}-${index}`}>
                    {get(specsData, `${spec}.${sizeColumn}`)}
                  </td>
                ))}
              </tr>
            ))}
            {showQty && selectedColor && (
              <tr>
                <td>Qty</td>
                {tableColumns.map((sizeColumn) => (
                  <td key={`td-${sizeColumn}-qty`}>
                    {get(
                      productData,
                      `${selectedColor}.sizes.${sizeColumn}.caseQty`,
                    )}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </Table>
      );
    }

    return null;
  };

  render() {
    const {
      isOpen,
      mode,
      toggle,
      product: { loading, data: productData },
    } = this.props;
    const { fetching = true } = this.state;

    return (
      <>
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          onEnter={this.onOpened}
          onExit={this.onClosed}
          wrapClassName="modal-right"
          scrollable
          size="lg"
        >
          {fetching ? (
            <div className="loading" />
          ) : (
            <>
              <ModalHeader toggle={toggle}>
                <span>
                  {`${productData.title} - ${productData.brandName} - ${productData.styleName}`}
                </span>
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Colxx
                    lg="auto"
                    className="d-flex flex-column align-items-center mb-4"
                  >
                    {this.renderProductImages()}
                  </Colxx>
                  <Colxx className="mb-4 order-3 order-lg-2">
                    <p className="font-weight-bold">{productData.title}</p>
                    <div>{ReactHtmlParser(productData.description)}</div>
                  </Colxx>
                  <Colxx xxs="12" className="my-4 order-2 order-lg-3">
                    <p className="font-weight-bold">Color</p>
                    <div>{this.renerProductColorSwatches()}</div>
                  </Colxx>
                  <Colxx xxs="12" className="my-4 order-2 order-lg-3">
                    <p className="font-weight-bold">Specs</p>
                    <div>{this.renderProductSpecs()}</div>
                  </Colxx>
                </Row>
              </ModalBody>
              {[ACTIONS.CREATE, ACTIONS.DELETE, ACTIONS.SELECT].includes(
                mode,
              ) && (
                <ModalFooter>
                  <Button color="secondary" size="lg" outline onClick={toggle}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    color={mode === ACTIONS.DELETE ? 'danger' : 'primary'}
                    size="lg"
                    className={`btn-shadow btn-multiple-state ${
                      loading ? 'show-spinner' : ''
                    }`}
                    onClick={this.onSubmit}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      {mode === ACTIONS.CREATE ? 'Add' : ''}
                      {mode === ACTIONS.DELETE ? 'Delete' : ''}
                      {mode === ACTIONS.SELECT ? 'Select' : ''}
                    </span>
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </Modal>
      </>
    );
  }
}

ProductModal.propTypes = {
  product: PropTypes.object.isRequired,
  initProduct: PropTypes.func.isRequired,
  fetchSelectedProduct: PropTypes.func.isRequired,
  createNewProduct: PropTypes.func.isRequired,
  deleteSelectedProduct: PropTypes.func.isRequired,
  styleId: PropTypes.number,
  mode: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
};

ProductModal.defaultProps = {
  styleId: null,
  isOpen: false,
  toggle: () => {},
};

export default ProductModal;
