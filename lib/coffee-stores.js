import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY,
});

const getUrlForCoffeeStores = (zip, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&near=${zip}&limit=${limit}`;
};

const getCoffeePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
    color: "green",
    orientation: "portrait",
  });
  return photos.response.results.map((result) => {
    return result.urls["small"];
  });
};

export const fetchCoffeeStores = async () => {
  const photos = await getCoffeePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(94115, "coffee", 6),
    options
  );
  const data = await response.json();

  return data.results.map((result, index) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighborhood: result.location.neighborhood,
      imgUrl: photos[index],
    };
  });
};
