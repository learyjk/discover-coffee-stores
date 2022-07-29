const getUrlForCoffeeStores = (zip, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&near=${zip}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
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
  return data.results;
};
