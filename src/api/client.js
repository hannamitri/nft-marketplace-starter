import axios from "axios";

export const api = axios.create({
  baseURL: "https://us-central1-nft-cloud-functions.cloudfunctions.net",
});
