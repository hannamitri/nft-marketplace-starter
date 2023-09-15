import axios from "axios";

export const getNewItems = async () => {
    let response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
    return response.data   
}