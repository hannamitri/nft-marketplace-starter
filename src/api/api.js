import axios from "axios";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";
const ITEMS_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
const SELLERS_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";
const EXPLORE_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
const FILTER_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter={value}";
const AUTHOR_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";
const ITEM_DETAILS_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

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

const getExploreItems = async () => {
  try {
    const response = await axios.get(EXPLORE_API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getFilterItems = async (filter) => {
  try {
    const response = await axios.get(
      `${FILTER_API_URL.replace("{value}", filter)}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAuthorItems = async (authorId) => {
  if (!authorId) {
    return null;
  }
  try {
    const response = await axios.get(`${AUTHOR_API_URL}?author=${authorId}`, {
      timeout: 5000,
    });
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getItemDetails = async (nftId) => {
  if (!nftId) {
    return null;
  }
  try {
    const response = await axios.get(`${ITEM_DETAILS_API_URL}?nftId=${nftId}`, {
      timeout: 5000,
    });
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  getHotCollections,
  getNewItems,
  getTopSellers,
  getExploreItems,
  getFilterItems,
  getAuthorItems,
  getItemDetails,
};
