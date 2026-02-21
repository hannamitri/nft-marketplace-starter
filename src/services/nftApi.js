import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_NFT_API_BASE_URL || 
  'https://us-central1-nft-cloud-functions.cloudfunctions.net';


export const fetchHotCollections = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotCollections`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch hot collections: ${error.message}`);
  }
};


export const fetchNewItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/newItems`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch new items: ${error.message}`);
  }
};
