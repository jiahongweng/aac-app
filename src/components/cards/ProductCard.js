import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardImg,
  Row,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { SS_ACTIVEWARE } from 'utils/constants';

const ProductCard = ({ product, isSelect, onClickItem }) => (
  <Colxx sm="6" lg="4" xl="3" xxl="2" className="mb-3" key={product.id}>
    <Card
      onClick={(event) => onClickItem(event, product.id)}
      className={classnames({
        active: isSelect,
      })}
    >
      <div className="position-relative">
        <CardImg
          top
          alt={product.title}
          src={`${SS_ACTIVEWARE.CDN_BASE}/${product.styleImage}`}
        />
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
  isSelect: PropTypes.bool,
  onClickItem: PropTypes.func,
};

ProductCard.defaultProps = {
  isSelect: false,
  onClickItem: () => {},
};

export default ProductCard;
