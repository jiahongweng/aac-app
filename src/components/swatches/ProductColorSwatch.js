import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SS_ACTIVEWARE } from 'utils/constants';

const Swatch = styled.div`
  float: left;
  display: table-cell;
  width: 49px;
  padding: 2px;
  height: 35px;
  vertical-align: top;
  cursor: pointer;
  overflow: hidden;
  margin-right: 1px;
  margin-bottom: 1px;
  font-size: 10px;
  line-height: 1.1;
  color: ${(props) => props.textColor};
  background-image: url('${SS_ACTIVEWARE.CDN_BASE}/${(props) => props.image}');
`;

const ProductColorSwatch = ({
  swatchImage,
  color,
  colorName,
  textColor,
  onSelectSwatch,
}) => (
  <Swatch
    key={color}
    image={swatchImage}
    textColor={textColor}
    onClick={() => onSelectSwatch(colorName)}
  >
    {colorName}
  </Swatch>
);

ProductColorSwatch.propTypes = {
  swatchImage: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  colorName: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  onSelectSwatch: PropTypes.func.isRequired,
};

export default ProductColorSwatch;
