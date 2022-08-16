import * as React from "react";
import Grid from "@mui/material/Grid";
import { Fade } from "react-awesome-reveal";
import BeatLoader from "react-spinners/BeatLoader";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import ImagePreview from "../cmps/ImagePreview.jsx";

function InfiniteScrollFeed({ data, onFetchData, searchValue, onOpenModal }) {
  let history = useHistory();
  let location = useLocation();
  // const bottomRef = React.useRef(null);
  const [hasMoreImgs, setHasMoreImgs] = React.useState(true);

  React.useEffect(() => {
    const { response } = data;
    if (response.results.length === response.total) setHasMoreImgs(false);
  }, [data]);

  const handleClick = (event) => {
    const { searchStr } = queryString.parse(location.search);
    history.push(`/?searchStr=${searchStr}&elementId=${event.target.id}`);
    onOpenModal();
  };

  // const scrollToElement = (id) => {
  //   setTimeout(() => {
  //     const element = document.getElementById(id);
  //     if (!element) {
  //       window.scrollTo(0, bottomRef.current.offsetTop);
  //       scrollToElement(id);
  //     }
  //     window.scrollTo({
  //       top: element?.offsetTop,
  //       behavior: "smooth",
  //     });
  //   }, 500);
  // };

  return (
    <div className="feed full">
      <InfiniteScroll
        dataLength={data.response.results.length}
        next={onFetchData}
        hasMore={hasMoreImgs}
        loader={
          <div className="loader">
            <BeatLoader size={30} color={"#222222"} />
          </div>
        }
      >
        <Grid container spacing={2}>
          {data.response.results.map((img, idx) => (
            <Grid item key={`${img.id}+${idx}`}>
              <Fade triggerOnce>
                <div
                  className="img-container"
                  onClick={(event) => handleClick(event)}
                >
                  <ImagePreview img={img} />
                </div>
              </Fade>
            </Grid>
          ))}
        </Grid>
        {!hasMoreImgs && (
          <div className="no-imgs-msg">End of results for "{searchValue}"</div>
        )}
        {/* <div ref={bottomRef} className="bottom-page" /> */}
      </InfiniteScroll>
    </div>
  );
}

export default InfiniteScrollFeed;
