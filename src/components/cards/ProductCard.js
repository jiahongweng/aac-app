import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component';
import { Card, CardBody, CardSubtitle, CardText, Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { SS_ACTIVEWARE } from 'utils/constants';

const ProductCard = ({ product, isSelect, onClickItem, scrollPosition }) => (
  <Colxx xs="6" md="4" xl="3" xxl="2" className="mb-3" key={product.id}>
    <Card
      onClick={(event) => onClickItem(event, product.id)}
      className={classnames('product-card', {
        active: isSelect,
      })}
    >
      <div className="card-img-container">
        <LazyLoadImage
          alt={product.title}
          className="card-img-top"
          effect="opacity"
          scrollPosition={scrollPosition}
          placeholderSrc={`${
            SS_ACTIVEWARE.CDN_BASE
          }/${product.styleImage.replace(`_fm`, `_fs`)}`}
          src={`${SS_ACTIVEWARE.CDN_BASE}/${product.styleImage}`}
        ></LazyLoadImage>
      </div>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            <CardSubtitle className="truncate">{product.title}</CardSubtitle>
            <CardText className="text-muted text-small mb-0 font-weight-light">
              {product.brandName}
            </CardText>
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  </Colxx>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  scrollPosition: PropTypes.object,
  isSelect: PropTypes.bool,
  onClickItem: PropTypes.func,
};

ProductCard.defaultProps = {
  scrollPosition: null,
  isSelect: false,
  onClickItem: () => {},
};

export default trackWindowScroll(ProductCard);
