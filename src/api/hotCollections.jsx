import axios from 'axios';

const BASE_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net';

export const getHotCollections = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/hotCollections`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching hot collections:', error);
    throw error;
  }
};
