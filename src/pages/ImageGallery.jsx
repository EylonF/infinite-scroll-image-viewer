import * as React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import SearchBar from "../cmps/SearchBar.jsx";
import InfiniteScrollFeed from "../cmps/InfiniteScrollFeed.jsx";

import { imageService } from "../services/image.service.js";

function ImageGallery() {
  let location = useLocation();
  const [data, setPhotosResponse] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState(null);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    let { searchStr } = queryString.parse(location.search);
    searchStr = searchStr === "undefined" ? null : searchStr;
    setSearchValue(searchStr);
    fetchData(searchStr, 1);
  }, [location]);

  const fetchData = async (value = searchValue, p = page) => {
    const response = value
      ? await imageService.getImages(value, p)
      : await imageService.getRandomImages();
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
        />
        {data.errors && <div>something went wrong...</div>}
        {data.response && (
          <InfiniteScrollFeed
            data={data}
            onFetchData={fetchData}
            page={page}
            searchValue={searchValue}
            onScrollUp={scrollUp}
          />
        )}
      </div>
    );
}

export default ImageGallery;
