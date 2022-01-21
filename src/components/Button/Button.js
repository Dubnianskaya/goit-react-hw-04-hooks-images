import React from "react";
import { LoadMoreBtn, ButtonContainer } from "./Button.styled";
import PropTypes from "prop-types";

const Button = ({ onLoadMore }) => (
  <ButtonContainer>
    <LoadMoreBtn type="button" onClick={onLoadMore}>
      Load more
    </LoadMoreBtn>
  </ButtonContainer>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
