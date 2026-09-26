import axios from "axios";

const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

export const getExploreItems = async (filter = "") => {
  const url = filter ? `${BASE_URL}?filter=${filter}` : BASE_URL;
  const { data } = await axios.get(url);
  return data;
};
