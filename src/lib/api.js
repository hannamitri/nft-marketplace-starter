import axios from "axios";

const http = axios.create({
  baseURL: "https://us-central1-nft-cloud-functions.cloudfunctions.net/",
});

export async function fetchHotCollections(signal) {
  const res = await http.get("hotCollections", { signal });
  return res.data; 
}