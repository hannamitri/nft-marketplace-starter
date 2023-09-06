import axios from "axios";

export const getHotCollections = async () => {
    let response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    return response.data   
}

