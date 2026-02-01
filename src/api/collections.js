import { api } from "./client";

export async function getHotCollections() {
  const response = await api.get("/hotCollections"); // change if needed
  return response.data;
}

