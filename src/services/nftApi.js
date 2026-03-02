import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_NFT_API_BASE_URL || 
  'https://us-central1-nft-cloud-functions.cloudfunctions.net';

/**
 * Fetch hot collections
 */
export const fetchHotCollections = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotCollections`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch hot collections: ${error.message}`);
  }
};

/**
 * Fetch new items
 */
export const fetchNewItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/newItems`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch new items: ${error.message}`);
  }
};

/**
 * Fetch top sellers
 */
export const fetchTopSellers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/topSellers`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch top sellers: ${error.message}`);
  }
};


export const fetchExploreItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/explore`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch explore items: ${error.message}`);
  }
};








































