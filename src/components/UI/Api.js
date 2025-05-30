import axios from 'axios';

const api = axios.create({
  baseURL: 'https://us-central1-nft-cloud-functions.cloudfunctions.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API request failed:', error);
    return Promise.reject(error);
  }
);

export default api;