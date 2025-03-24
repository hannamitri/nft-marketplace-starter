import apiClient from "./apiClient";

const hotCollectionsService = {
  getHotCollections: async () => {
    try {
      const response = await apiClient.get("hotCollections");
      console.log("API Response from hotCollectionsService:", response);
      return response;
    } catch (error) {
      console.error("API Error in hotCollectionsService:", error);
      throw error;
    }
  },
};

export default hotCollectionsService;
