import React, { Component } from "react";
import { Container, Notifications } from "./App.styled";
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import Button from "../Button";
import fetchArticles from "./ImageApi";
import Modal from "../Modal";
import Loader from "../Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends Component {
  state = {
    imageForSeach: "",
    images: [],
    status: "idle",
    page: 1,
    largeImg: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.imageForSeach !== this.state.imageForSeach ||
      prevState.page !== this.state.page
    ) {
      this.fetchHits();
    }
  }

  handleFormSubmit = (imageName) => {
    this.setState({ imageForSeach: imageName, page: 1, images: [] });
  };

  fetchHits = () => {
    const { imageForSeach, page } = this.state;
    this.setState({ status: "pending" });

    fetchArticles(page, imageForSeach).then((images) => {
      if (images.totalHits !== 0) {
        return this.setState((prevState) => ({
          images: [...prevState.images, ...images.hits],
          status: "resolved",
        }));
      }
      return this.setState({ status: "rejected" });
    });
  };

  onLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  closeModal = () => {
    this.setState({ largeImg: "" });
  };

  onLargeImageOpen = (largeImage) => {
    this.setState({ largeImg: largeImage });
  };

  render() {
    const { images, status, largeImg, page } = this.state;
    return (
      <Container>
        <Searchbar onSubmitForm={this.handleFormSubmit} />
        <ToastContainer />
        {status === "idle" && (
          <Notifications>Enter an image search query!</Notifications>
        )}
        {status === "pending" && page > 1 && (
          <>
            <ImageGallery images={images} onModalShow={this.onLargeImageOpen} />
            <Loader />
          </>
        )}
        {status === "pending" && <Loader />}
        {status === "rejected" && (
          <Notifications>Images by your query are not founded :(</Notifications>
        )}
        {status === "resolved" && (
          <>
            <ImageGallery images={images} onModalShow={this.onLargeImageOpen} />
            <Button onLoadMore={this.onLoadMore} />
          </>
        )}
        {largeImg && <Modal image={largeImg} onClose={this.closeModal}></Modal>}
      </Container>
    );
  }
}

export default App;
