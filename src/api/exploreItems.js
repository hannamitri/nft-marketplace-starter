import axios from "axios";


export const getExploreItemsFilter = async (value) => {
    let response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`)
    return response.data   
}