import apiClient from './apiClient';


export const getItemDetails = async (nftId) => {
    try {
        const response = await apiClient.get(`/itemDetails?nftId=${nftId}`);
        console.log("API raw response from itemDetailsService:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching item details:", error);
        throw error;
      }
  };
