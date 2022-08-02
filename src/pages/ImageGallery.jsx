import * as React from "react";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { imageService } from "../services/image.service.js";
import ImagePreview from "../cmps/ImagePreview.jsx";

function ImageGallery() {
  const [data, setPhotosResponse] = React.useState(null);

  React.useEffect(() => {
    console.log("mounted");
    async function fetchData() {
      const response = await imageService.getRandomImages();
      setPhotosResponse(response);
    }
    fetchData();
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="image-container page">
        <AppHeader />
        {data.errors && <div>something went wrong...</div>}
        {data.response && (
          <div className="feed">
            {data.response.results.map((photo) => (
              <ImagePreview photo={photo} />
            ))}
          </div>
        )}
      </div>
    );
}

export default ImageGallery;
