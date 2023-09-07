import axios from "axios";

export const getItemDetails = async (value) => {
    let response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${value}`)
    console.log(response.data)
    return response.data   
}