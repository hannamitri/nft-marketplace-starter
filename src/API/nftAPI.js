import axios from "axios";

const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net";

export const getHotCollections = async () => {
  const res = await axios.get(`${BASE_URL}/hotCollections`);
  return res.data;
};

export const getNewItems = async () => {
  const res = await axios.get(`${BASE_URL}/newItems`);
  return res.data;
};



export const getTopSellers = async () => {
  const res = await axios.get(`${BASE_URL}/topSellers`);
  return res.data;
};



export const getExploreItems = async () => {
  const res = await axios.get(`${BASE_URL}/explore`);
  console.log("FULL EXPLORE RESPONSE:", res.data);
  return res.data;   
};



export const getAuthorById = async (authorId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/authors?author=${authorId}`
    );

    return res.data;
  } catch (error) {
    console.error("Author API error:", error);
    return null;
  }
};

export const getItemDetails = async (nftId) => {
  try {

    const response = await fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("ItemDetails API Error:", error);
    return null;
  }
};