import axios from "axios";

const http = axios.create({
  baseURL: "https://us-central1-nft-cloud-functions.cloudfunctions.net/",
});

export async function fetchHotCollections(signal) {
  const res = await http.get("hotCollections", { signal });
  return res.data; 
}

export async function fetchNewItems(signal) {
  const res = await http.get("newItems", { signal });
  return res.data || [];
}

export async function fetchTopSellers(signal) {
    const res = await http.get("topSellers", { signal });
    return res.data || [];
}