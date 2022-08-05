import * as React from "react";
import { HashRouter as Router, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

import { imageService } from "../services/image.service.js";

function ImageDetails() {
  const [image, setImage] = React.useState(null);
  let { imageId } = useParams();

  React.useEffect(() => {
    async function fetchData() {
      const response = await imageService.getImage(imageId);
      setImage(response);
    }
    fetchData();
  }, []);
  if (image === null) {
    return <div className="loader main-container page">Loading...</div>;
  } else
    return (
      <div className="image-details main-container page">
        <img className="img" src={image.urls.regular} />
        <small>
          {image.width} ⨯ {image.height}
        </small>
        {/* <h3>{image.description}</h3> */}
        <h4>{image.location.title}</h4>
        <small>
          Downloads-{image.downloads.toLocaleString()} | Likes-
          {image.likes.toLocaleString()} | Views-
          {image.views.toLocaleString()}
        </small>
        <h3>Photographer: {image.user.name}</h3>
        <img className="user-img" src={image.user.profile_image.medium} />
        <div className="btn-container">
          <Button
            variant="contained"
            onClick={async () => {
              imageService.downloadImage(image.links.download_location);
            }}
          >
            Download
          </Button>
        </div>
      </div>
    );
}

export default ImageDetails;
