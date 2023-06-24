import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  onChangeModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const { showModal } = this.state;
    const { image } = this.props;
    return (
      <>
        <li className={css.item}>
          <img
            className={css.image}
            src={image.webformatURL}
            alt={image.tags}
            onClick={this.onChangeModal}
          />
          {showModal && (
            <Modal
              largeImageURL={image.largeImageURL}
              tags={image.tags}
              onClose={this.onChangeModal}
            />
          )}
        </li>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
