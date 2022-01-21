import React from "react";
import {
  ImageGalleryItemStyled,
  ImageGalleryItemImage,
} from "./ImageGalleryItem.styled";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ smallImage, largeImage, tags, onModalShow }) => (
  <ImageGalleryItemStyled onClick={() => onModalShow(largeImage)}>
    <ImageGalleryItemImage src={smallImage} alt={tags} />
  </ImageGalleryItemStyled>
);

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onModalShow: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
