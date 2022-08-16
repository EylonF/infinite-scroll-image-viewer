import * as React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import SearchBar from "../cmps/SearchBar.jsx";
import InfiniteScrollFeed from "../cmps/InfiniteScrollFeed.jsx";
import ImgDetailsModal from "../cmps/ImgDetailsModal.jsx";

import { imageService } from "../services/image.service.js";

function ImageGallery() {
  let location = useLocation();
  const [data, setPhotosResponse] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    let { searchStr, elementId } = queryString.parse(location.search);
    searchStr = !searchStr || searchStr === "undefined" ? null : searchStr;
    if (elementId && !data) setIsOpen(true);
    if (!data || (!elementId && searchStr !== searchValue))
      fetchData(searchStr, 1);
    setSearchValue(searchStr);
  }, [location]);

  const fetchData = async (value = searchValue, p = page) => {
    const response = value
      ? await imageService.getImages(value, p)
      : await imageService.getRandomImages();
    console.log("response", response);
    if (!data || value !== searchValue) setPhotosResponse(response);
    else {
      setPhotosResponse({
        ...data,
        response: {
          ...data.response,
          results: [...data.response.results, ...response.response.results],
        },
      });
    }
    if (value) setPage(p + 1);
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (data === null) {
    return (
      <div className="loader">
        <BeatLoader size={30} color={"#222222"} />
      </div>
    );
  } else
    return (
      <div className="image-gallery main-container page">
        <SearchBar
          onSetPhotosResponse={setPhotosResponse}
          onSetPage={setPage}
          onScrollUp={scrollUp}
          gSearchValue={searchValue}
          modalIsOpen={modalIsOpen}
          onCloseModal={closeModal}
        />
        {data.errors && <div>something went wrong...</div>}
        {data.response && (
          <React.Fragment>
            <InfiniteScrollFeed
              data={data}
              onFetchData={fetchData}
              searchValue={searchValue}
              onScrollUp={scrollUp}
              onOpenModal={openModal}
            />
            <ImgDetailsModal
              modalIsOpen={modalIsOpen}
              onCloseModal={closeModal}
            />
          </React.Fragment>
        )}
      </div>
    );
}

export default ImageGallery;
