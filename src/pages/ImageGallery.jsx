import * as React from "react";

import { SearchBar } from "../cmps/SearchBar.jsx";
import { imageService } from "../services/image.service.js";
import ImagePreview from "../cmps/ImagePreview.jsx";

function ImageGallery() {
  const [data, setPhotosResponse] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const response = searchValue
        ? await imageService.getImages(searchValue)
        : await imageService.getRandomImages();
      console.log("searchValue", searchValue);
      setPhotosResponse(response);
    }
    fetchData();
  }, [searchValue]);

  if (data === null) {
    return <div className="loader main-container page">Loading...</div>;
  } else
    return (
      <div className="image-gallery main-container page">
        <SearchBar onSetSearchValue={setSearchValue} />
        {data.errors && <div>something went wrong...</div>}
        {data.response && (
          <div className=" feed-container main-container full">
            <div className="feed">
              {data.response.results.map((photo) => (
                <ImagePreview photo={photo} key={photo.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
}

export default ImageGallery;
