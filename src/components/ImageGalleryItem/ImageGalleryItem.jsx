import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ url, tags, onClick }) {
  return (
    <li className={css.item}>
      <img
        className={css.image}
        src={url}
        alt={tags}
        onClick={() => onClick(url)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
