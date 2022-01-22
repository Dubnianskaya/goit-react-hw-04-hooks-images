import { useState, useEffect, memo } from "react";
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

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [largeImg, setLargeImg] = useState("");

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus("pending");

    fetchArticles(page, query).then((images) => {
      if (images.totalHits !== 0) {
        setImages((prevState) => [...prevState, ...images.hits]);
        setStatus("resolved");
        return;
      }
      return setStatus("rejected");
    });
  }, [query, page]);

  const handleFormSubmit = (imageName) => {
    setQuery(imageName);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  const closeModal = () => {
    setLargeImg("");
  };

  return (
    <Container>
      <Searchbar onSubmitForm={handleFormSubmit} />
      <ToastContainer />
      {status === "idle" && (
        <Notifications>Enter an image search query!</Notifications>
      )}
      {status === "pending" && page > 1 && (
        <>
          <ImageGallery images={images} onModalShow={setLargeImg} />
          <Loader />
        </>
      )}
      {status === "pending" && <Loader />}
      {status === "rejected" && (
        <Notifications>Images by your query are not founded :(</Notifications>
      )}
      {status === "resolved" && (
        <>
          <ImageGallery images={images} onModalShow={setLargeImg} />
          <Button onLoadMore={onLoadMore} />
        </>
      )}
      {largeImg && <Modal image={largeImg} onClose={closeModal}></Modal>}
    </Container>
  );
}

export default memo(App);
