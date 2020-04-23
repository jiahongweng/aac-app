import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

const Colxx = (props) => (
  <Col {...props} widths={['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']} />
);

const Separator = (props) => (
  <div className={`separator ${props.className}`}></div>
);

Separator.propTypes = {
  className: PropTypes.string,
};

Separator.defaultProps = {
  className: '',
};

export { Colxx, Separator };
