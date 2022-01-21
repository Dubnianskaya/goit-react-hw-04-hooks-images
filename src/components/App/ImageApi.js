const fetchArticles = (currentPage, imageForSearch) => {
  const KEY = "24391071-3bb2721b0275ed041db341680";
  return fetch(
    `https://pixabay.com/api/?q=${imageForSearch}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => response.json());
};

export default fetchArticles;
