import * as React from "react";
import { HashRouter as Router, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Fade, Reveal } from "react-awesome-reveal";
import BeatLoader from "react-spinners/BeatLoader";
import { useHistory } from "react-router-dom";
import ProgressiveImage from "react-progressive-graceful-image";

import { imageService } from "../services/image.service.js";
import ImagePreview from "../cmps/ImagePreview.jsx";

function ImageDetails() {
  const [image, setImage] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const { imageId } = useParams();
  let history = useHistory();

  React.useEffect(() => {
    async function fetchData() {
      const response = await imageService.getImage(imageId);
      setImage(response);
      setUser(response.user);
    }
    fetchData();
    scrollUp();
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (image === null) {
    return (
      <div className="loader">
        <BeatLoader size={30} color={"#222222"} />
      </div>
    );
  } else
    return (
      <div className="image-details main-container page">
        <Button variant="text" onClick={() => history.goBack()}>
          {"◀ BACK"}{" "}
        </Button>
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
                  {/* <h2>{image.user.name}</h2> */}
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
          {/* <ProgressiveImage
            src={image.urls.full}
            placeholder={image.urls.small}
          >
            {(src, loading) => (
              <img
                width={image.width}
                height={image.height}
                className={`img${loading ? " loading" : " loaded"}`}
                src={src}
              />
            )}
          </ProgressiveImage> */}
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
            </div>
          </div>
        </div>
      </div>
    );
}

export default ImageDetails;
