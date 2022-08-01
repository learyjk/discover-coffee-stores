import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
});

const getUrlForCoffeeStores = (
  latLong = "37.78280729444889,-122.44326064919453",
  query,
  limit = 6
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&near=${latLong}&limit=${limit}`;
};

const getCoffeePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  return photos.response.results.map((result) => {
    return result.urls["small"];
  });
};

export const fetchCoffeeStores = async (latLong, limit) => {
  const photos = await getCoffeePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  // console.log(getUrlForCoffeeStores(latLong, "coffee", limit));

  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee", limit),
    options
  );
  const data = await response.json();
  console.log("data", data);

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
