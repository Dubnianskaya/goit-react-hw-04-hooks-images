import React from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import { ImageGalleryList } from "./ImageGallery.styled";
import PropTypes from "prop-types";

const ImageGallery = ({ images, onModalShow }) => (
  <ImageGalleryList>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        key={id}
        smallImage={webformatURL}
        largeImage={largeImageURL}
        tags={tags}
        onModalShow={onModalShow}
      />
    ))}
  </ImageGalleryList>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onModalShow: PropTypes.func.isRequired,
};

export default ImageGallery;
