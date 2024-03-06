import axios from "axios";
const base_url = "https://us-central1-nft-cloud-functions.cloudfunctions.net/"
const Service = {
    fetchHotCollections: async () => {
        try{
            const response = await axios.get(`${base_url}/hotCollections`)
            return response.data
        } catch(error) {
            console.error("Error requesting skills", error)
            throw error;
        }
    }
}

export default Service;

