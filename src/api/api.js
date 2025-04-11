import axios from "axios";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";
const ITEMS_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
const SELLERS_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const getHotCollections = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/hot-collections`);
    const collections = response.data;
    if (id) {
      return collections.find((item) => item.id === id);
    }
    return collections;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getNewItems = async () => {
  try {
    const response = await axios.get(ITEMS_API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getTopSellers = async () => {
  try {
    const response = await axios.get(SELLERS_API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getHotCollections, getNewItems, getTopSellers };
