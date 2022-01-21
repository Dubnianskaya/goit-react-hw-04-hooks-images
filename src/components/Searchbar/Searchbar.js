import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SeachImage,
  SearchFormButtonLabel,
  SearchFormInput,
} from "./Searchbar.styled";
import PropTypes from "prop-types";

export default class Searchbar extends Component {
  state = {
    imageName: "",
  };

  handleNameChange = (event) => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.imageName.trim() === "") {
      return toast.error("Enter a query to seach for images");
    }
    this.props.onSubmitForm(this.state.imageName);
    this.setState({ imageName: "" });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SeachImage />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
