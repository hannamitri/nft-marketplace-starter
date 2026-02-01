import { api } from "./client";

export async function getNewItems() {
  const response = await api.get("/newItems");
  return response.data;
}
