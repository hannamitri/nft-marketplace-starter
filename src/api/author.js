import axios from "axios";

export const getAuthor = async (value) => {
    let response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${value}`)
    return response.data   
}