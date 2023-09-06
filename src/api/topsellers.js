import axios from "axios";

export const getTopSellers = async () => {
    let response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
   
    return response.data
}