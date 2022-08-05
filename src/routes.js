import ImageGallery from "./pages/ImageGallery.jsx";
import ImageDetails from "./pages/ImageDetails.jsx";

const routes = [
  {
    path: "/:imageId",
    component: ImageDetails,
  },
  {
    path: "/",
    component: ImageGallery,
  },
];

export default routes;
