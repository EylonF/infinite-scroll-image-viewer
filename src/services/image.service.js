import { createApi } from "unsplash-js";

export const imageService = {
  getRandomImages,
};

const api = createApi({
  accessKey: "71f3AzPpMbdMV9NavlxJr9OkqT_nVlkL5T4xX6NCowk",
});

async function getRandomImages(page = 1, perPage = 30) {
  try {
    const res = await api.photos.list({ page: page, perPage: perPage });
    return res;
  } catch (err) {
    console.log("Cannot get images:", err);
    throw err;
  }
}
