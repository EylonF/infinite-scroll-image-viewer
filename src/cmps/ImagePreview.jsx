import { withRouter, Link } from "react-router-dom";

function ImagePreview({ photo }) {
  const { user, urls } = photo;

  return (
    <div className="img-preview-container">
      <Link key={photo.id} to={`/${photo.id}`}>
        <img className="img" src={urls.regular} />
      </Link>

      <a
        className="credit clean-link"
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
      >
        {user.name}
      </a>
    </div>
  );
}

export default ImagePreview;
