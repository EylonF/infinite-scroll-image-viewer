import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Fade, Reveal } from "react-awesome-reveal";
import BeatLoader from "react-spinners/BeatLoader";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import { imageService } from "../services/image.service.js";
import ImagePreview from "../cmps/ImagePreview.jsx";

function ImageDetails({ onCloseModal }) {
  const [image, setImage] = React.useState(null);
  const [user, setUser] = React.useState(null);
  let history = useHistory();
  let location = useLocation();

  React.useEffect(() => {
    const { elementId } = queryString.parse(location.search);
    async function fetchData() {
      const response = await imageService.getImage(elementId);
      setImage(response);
      setUser(response.user);
    }
    fetchData();
  }, []);

  if (image === null) {
    return (
      <div className="loader">
        <BeatLoader size={30} color={"#222222"} />
      </div>
    );
  } else
    return (
      <div className="image-details main-container page">
        <Reveal triggerOnce delay={500}>
          <Button
            variant="text"
            onClick={() => {
              history.goBack();
              onCloseModal();
            }}
          >
            {"◀ BACK"}{" "}
          </Button>
        </Reveal>
        <Fade triggerOnce>
          <div className="img-header">
            {user && (
              <Link
                href={`https://unsplash.com/@${user.username}`}
                color="inherit"
                sx={{ fontSize: 18 }}
              >
                <div className="img-by">
                  <img
                    className="user-img"
                    src={image.user.profile_image.medium}
                  />
                  {image.user.name}
                </div>
              </Link>
            )}

            <small className="img-resolution">
              {image.width} ⨯ {image.height}
            </small>
          </div>
        </Fade>
        <Fade triggerOnce>
          <ImagePreview img={image} imgSize="full" />
        </Fade>

        <div className="img-info">
          <small>
            Downloads - {image.downloads.toLocaleString()} | Likes -{" "}
            {image.likes.toLocaleString()} | Views -{" "}
            {image.views.toLocaleString()}
          </small>
          <div className="info-container">
            <div className="info-headers">
              <h1>{image.description}</h1>
              <h2>{image.location.title}</h2>
            </div>
            <div className="btn-container">
              <Button
                variant="contained"
                onClick={async () => {
                  imageService.downloadImage(image.links.download_location);
                }}
              >
                Download
              </Button>
              <Button
                variant="contained"
                onClick={async () => {
                  if (navigator.share) imageService.shareImage(image);
                  else
                    navigator.clipboard.writeText(image.urls.full).then(() => {
                      alert("Copied to clipboard");
                    });
                }}
                className="share-btn"
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ImageDetails;
