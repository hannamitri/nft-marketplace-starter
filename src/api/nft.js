import axios from "axios";

const BASE_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net";

const client = axios.create({ baseURL: BASE_URL });

export const getHotCollections = async () => {
  const { data } = await client.get("/hotCollections");
  return data;
};

export const getNewItems = async () => {
  const { data } = await client.get("/newItems");
  return data;
};

export const getTopSellers = async () => {
  const { data } = await client.get("/topSellers");
  return data;
};

export const getExploreItems = async (filter) => {
  const { data } = await client.get("/explore", {
    params: filter ? { filter } : {},
  });
  return data;
};

export const getAuthor = async (authorId) => {
  const { data } = await client.get("/authors", {
    params: { author: authorId },
  });
  return data;
};

export const getItemDetails = async (nftId) => {
  const { data } = await client.get("/itemDetails", { params: { nftId } });
  return data;
};

export default client;
