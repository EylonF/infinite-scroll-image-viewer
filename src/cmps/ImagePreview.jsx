import ProgressiveImage from "react-progressive-graceful-image";

function ImagePreview({ img, imgSize = "small" }) {
  const { user, urls } = img;
  const imgSrc = imgSize === "full" ? urls.full : urls.small;
  return (
    <div className="img-preview-container">
      <ProgressiveImage src={imgSrc} placeholder={urls.thumb}>
        {(src, loading) => (
          <img
            width={img.width}
            height={img.height}
            className={`img${loading ? " loading" : " loaded"}`}
            src={src}
            id={img.id}
          />
        )}
      </ProgressiveImage>
    </div>
  );
}

export default ImagePreview;
