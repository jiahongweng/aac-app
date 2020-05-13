import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import { SS_ACTIVEWARE } from 'utils/constants';

// const images = [
//   {
//     id: 'front',
//     label: 'Front',
//     src: 'Images/Color/82600_f_fm.jpg',
//   },
//   {
//     id: 'side',
//     label: 'Side',
//     src: 'Images/Color/82600_fm.jpg',
//   },
//   {
//     id: 'back',
//     label: 'Back',
//     src: 'Images/Color/82600_b_fm.jpg',
//   },
//   {
//     id: 'model',
//     label: 'Model',
//     src: 'Images/Color/82600_b_fm.jpg',
//   },
// ];

class ProductImagesCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImgIndex: 0,
      isOpen: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      this.onSelectImage(0);
    }
  }

  onSelectImage = (index, open = false) => {
    this.setState({
      selectedImgIndex: index,
      isOpen: open,
    });
  };

  getScaleImage = (src, fromScale = 'fm', toScale = 'fl') =>
    `${SS_ACTIVEWARE.CDN_BASE}/${src.replace(`_${fromScale}`, `_${toScale}`)}`;

  render() {
    const { images } = this.props;
    const { selectedImgIndex, isOpen } = this.state;
    const currentImage = images[selectedImgIndex];
    const lightboxImages = images
      .filter((image) => image.id !== 'model')
      .map((image) => this.getScaleImage(image.src));

    return (
      <>
        <div className="position-relative">
          <NavLink
            to="#"
            onClick={() => this.onSelectImage(selectedImgIndex, true)}
            location={{}}
          >
            <img
              alt={currentImage.label}
              src={`${SS_ACTIVEWARE.CDN_BASE}/${currentImage.src}`}
            />
          </NavLink>
        </div>

        {isOpen &&
          (currentImage.id === 'model' ? (
            <Lightbox
              mainSrc={this.getScaleImage(currentImage.src)}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          ) : (
            <Lightbox
              mainSrc={lightboxImages[selectedImgIndex]}
              nextSrc={
                lightboxImages[(selectedImgIndex + 1) % lightboxImages.length]
              }
              prevSrc={
                lightboxImages[
                  (selectedImgIndex + lightboxImages.length - 1) %
                    lightboxImages.length
                ]
              }
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  selectedImgIndex:
                    (selectedImgIndex + lightboxImages.length - 1) %
                    lightboxImages.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  selectedImgIndex:
                    (selectedImgIndex + 1) % lightboxImages.length,
                })
              }
            />
          ))}

        <div className="d-flex">
          {currentImage.id !== 'model' &&
            images.map(({ id, label }, index) => (
              <NavLink
                key={id}
                to="#"
                className="m-3"
                onClick={() => this.onSelectImage(index)}
              >
                {label}
              </NavLink>
            ))}
        </div>
      </>
    );
  }
}

ProductImagesCarousel.propTypes = {
  images: PropTypes.array,
  color: PropTypes.string,
};

ProductImagesCarousel.defaultProps = {
  images: [],
  color: '',
};

export default ProductImagesCarousel;
