import { createApi } from "unsplash-js";
import { saveAs } from "file-saver";

export const imageService = {
  getRandomImages,
  getImages,
  getImage,
  downloadImage,
};

const api = createApi({
  accessKey: "71f3AzPpMbdMV9NavlxJr9OkqT_nVlkL5T4xX6NCowk",
});

async function getImages(value, page, perPage = 30) {
  try {
    const res = await api.search.getPhotos({
      query: value,
      page: page,
      perPage: perPage,
    });
    console.log("res: ", res);
    return res;
  } catch (err) {
    console.log("Cannot get images:", err);
    throw err;
  }
}
async function getImage(imgId) {
  try {
    const res = await api.photos.get({
      photoId: imgId,
    });
    return res.response;
  } catch (err) {
    console.log("Cannot get image:", err);
    throw err;
  }
}
async function downloadImage(url) {
  try {
    const res = await api.photos.trackDownload({
      downloadLocation: url,
    });
    saveAs(res.response.url, "image.jpg");
    console.log("res: ", res);

    // return res;
  } catch (err) {
    console.log("Cannot get image:", err);
    throw err;
  }
}
async function getRandomImages(perPage = 30) {
  try {
    const res = await api.photos.getRandom({ count: perPage });
    console.log("res: ", res);
    let data = {
      response: {
        results: res.response,
      },
    };
    return data;
  } catch (err) {
    console.log("Cannot get images:", err);
    throw err;
  }
}
