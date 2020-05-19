import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component';
import { NavLink } from 'react-router-dom';
import { Card, Badge } from 'reactstrap';
import moment from 'moment';
import { Colxx } from 'components/common/CustomBootstrap';
import { SS_ACTIVEWARE, ORDER_STATUS } from 'utils/constants';

const OrderCard = ({ order, isSelect, onClickItem, scrollPosition }) => (
  <Colxx xxs="12" className="mb-3" key={order.orderId}>
    <Card
      onClick={(event) => onClickItem(event, order.orderId)}
      className={classnames('order-card d-flex flex-row', {
        active: isSelect,
      })}
    >
      <div className="card-img-container d-flex">
        <LazyLoadImage
          alt={order.style.title}
          className="list-thumbnail responsive border-0 card-img-left"
          effect="opacity"
          scrollPosition={scrollPosition}
          placeholderSrc={`${
            SS_ACTIVEWARE.CDN_BASE
          }/${order.style.styleImage.replace(`_fm`, `_fs`)}`}
          src={`${SS_ACTIVEWARE.CDN_BASE}/${order.style.styleImage}`}
        ></LazyLoadImage>
      </div>
      <div className="pl-2 d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          <NavLink to={`?p=${order.orderId}`} className="w-40 w-sm-100">
            <p className="list-item-heading mb-1 truncate">
              {order.organization.name}
            </p>
          </NavLink>

          <p className="mb-1 text-muted text-small w-15 w-sm-100">
            {order.style.brandName}
          </p>

          <p className="mb-1 text-muted text-small w-15 w-sm-100">
            {moment(order.dueDate).format('MM.DD.YYYY')}
          </p>

          <div className="w-15 w-sm-100">
            <Badge
              color={ORDER_STATUS[order.status].color}
              className="px-4"
              pill
            >
              {ORDER_STATUS[order.status].name}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  </Colxx>
);

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  scrollPosition: PropTypes.object,
  isSelect: PropTypes.bool,
  onClickItem: PropTypes.func,
};

OrderCard.defaultProps = {
  scrollPosition: null,
  isSelect: false,
  onClickItem: () => {},
};

export default trackWindowScroll(OrderCard);
