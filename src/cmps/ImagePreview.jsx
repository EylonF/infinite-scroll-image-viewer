function ImagePreview({ photo }) {
  const { user, urls } = photo;

  return (
    <div className="img-preview-container">
      <img className="img" src={urls.regular} />
      <a
        className="credit"
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
      >
        {user.name}
      </a>
    </div>
  );
}

export default ImagePreview;
