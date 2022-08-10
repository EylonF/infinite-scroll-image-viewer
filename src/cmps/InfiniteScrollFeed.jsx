import * as React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Fade } from "react-awesome-reveal";
import BeatLoader from "react-spinners/BeatLoader";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";
import ImagePreview from "../cmps/ImagePreview.jsx";

function InfiniteScrollFeed({ data, onFetchData, searchValue }) {
  let history = useHistory();
  let location = useLocation();
  const bottomRef = React.useRef(null);
  const [hasMoreImgs, setHasMoreImgs] = React.useState(true);

  React.useEffect(() => {
    const { elementId, searchStr } = queryString.parse(location.search);
    if (elementId && searchStr !== "undefined") scrollToElement(elementId);
  }, []);
  React.useEffect(() => {
    const { response } = data;
    console.log("data.response.total: ", response.total);
    console.log("data.response.results.length: ", response.results.length);
    if (response.results.length === response.total) setHasMoreImgs(false);
  }, [data]);

  const handleClick = (event) => {
    const { searchStr } = queryString.parse(location.search);
    // console.log("event: ", event);
    history.push(`/?searchStr=${searchStr}&elementId=${event.target.id}`);
  };

  const scrollToElement = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (!element) {
        console.log("bottomRef: ", bottomRef);
        // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        window.scrollTo(0, bottomRef.current.offsetTop);
        scrollToElement(id);
      }
      window.scrollTo({
        top: element?.offsetTop,
        behavior: "smooth",
      });
    }, 500);
  };

  // const scrollDown = (bottomRef) => {
  //   // scrollToElement(id);
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
                <Link
                  key={img.id}
                  to={`/${img.id}`}
                  onClick={(event) => handleClick(event)}
                >
                  <ImagePreview img={img} />
                </Link>
              </Fade>
            </Grid>
          ))}
        </Grid>
        {!hasMoreImgs && (
          <div className="no-imgs-msg">End of results for "{searchValue}"</div>
        )}
        <div ref={bottomRef} className="bottom-page" />
      </InfiniteScroll>
    </div>
  );
}

export default InfiniteScrollFeed;
