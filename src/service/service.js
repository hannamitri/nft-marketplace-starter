import axios from "axios";
const base_url = "https://us-central1-nft-cloud-functions.cloudfunctions.net";
const Service = {
  fetchHotCollections: async () => {
    try {
      const response = await axios.get(`${base_url}/hotCollections`);
      return response.data;
    } catch (error) {
      console.error("Error requesting hot Collections", error);
      throw error;
    }
  },
  fetchNewItems: async () => {
    try {
      const response = await axios.get(`${base_url}/newItems`);
      return response.data;
    } catch (error) {
      console.error("Error requesting fetch New Items", error);
      throw error;
    }
  },
  fetchTopSellers: async () => {
    try {
      const response = await axios.get(`${base_url}/topSellers`);
      return response.data;
    } catch (error) {
      console.error("Error requesting fetch Top Sellers", error);
      throw error;
    }
  },
  fetchExploreItems: async () => {
    try {
      const response = await axios.get(`${base_url}/explore`);
      return response.data;
    } catch (error) {
      console.error("Error requesting fetch explore items", error);
      throw error;
    }
  },
  fetchFilterExploreItems: async (filter) => {
    try {
      const response = await axios.get(`${base_url}/explore?filter=${filter}`);
      return response.data;
    } catch (error) {
      console.error("Error requesting fetch filter explore items", error);
      throw error;
    }
  },
  fetchAuthor: async (authorId) => {
    try {
      const response = await axios.get(
        `${base_url}/authors?author=${authorId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error requesting author details", error);
      throw error;
    }
  },
};

export default Service;
