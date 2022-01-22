import { memo, useState } from "react";
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

function Searchbar({ onSubmitForm }) {
  const [imageName, setImageName] = useState("");

  const handleNameChange = (event) => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (imageName.trim() === "") {
      return toast.error("Enter a query to seach for images");
    }
    onSubmitForm(imageName);
    setImageName("");
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SeachImage />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleNameChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default memo(Searchbar);
