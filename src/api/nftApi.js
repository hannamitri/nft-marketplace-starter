import axios from "axios";

const API_ROOT = "https://us-central1-nft-cloud-functions.cloudfunctions.net";

export const API_URLS = {
  explore: `${API_ROOT}/explore`,
  hotCollections: `${API_ROOT}/hotCollections`,
  newItems: `${API_ROOT}/newItems`,
  topSellers: `${API_ROOT}/topSellers`,
};

export const fetchApiList = async (url, signal) => {
  const { data } = await axios.get(url, { signal, timeout: 15000 });
  if (!Array.isArray(data)) throw new Error("Unexpected API response");
  return data;
};
