import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ThumbnailImage = ({ alt, src, className, rounded, small, large }) => (
  <img
    alt={alt}
    src={src}
    className={`img-thumbnail list-thumbnail align-self-center ${className}  ${classnames(
      {
        'rounded-circle': rounded,
        small,
        large,
      },
    )}`}
  />
);

ThumbnailImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
};

ThumbnailImage.defaultProps = {
  alt: '',
  className: '',
  rounded: false,
  small: false,
  large: false,
};

export default ThumbnailImage;
