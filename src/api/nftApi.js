export const ITEM_DETAILS_API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

export const NEW_ITEMS_API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

/** Used when legacy static links hit `/item-details` without an id */
export const FALLBACK_NFT_ID = 10147817;

const mapNewItem = (item) => ({
  id: item.id,
  nftId: item.nftId,
  authorImage: item.authorImage || "",
  nftImage: item.nftImage || "",
  title: item.title || "Untitled",
  price: typeof item.price === "number" ? item.price : 0,
  likes: typeof item.likes === "number" ? item.likes : 0,
  expiryDate: item.expiryDate ?? null,
});

/** Fetches and normalizes the new-items list from the Cloud Function. */
export const fetchNewItems = async (signal) => {
  const response = await fetch(NEW_ITEMS_API, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid response format");
  }
  return data.map(mapNewItem);
};

export const fetchItemDetails = async (nftId, signal) => {
  const url = `${ITEM_DETAILS_API}?nftId=${encodeURIComponent(nftId)}`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
};
