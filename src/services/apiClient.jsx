// services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://us-central1-nft-cloud-functions.cloudfunctions.net/',
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json',
  }
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);




export default apiClient;
