import axios from "axios";

const API_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net";

const Service = {
  fetchAuthor: async (authorId) => {
    try {
      const response = await axios.get(`${API_URL}/authors?author=${authorId}`);
      return response.data;
    } catch (error) {
      console.error("Error Message:", error);
      throw error
    }
  },
};

export default Service;
