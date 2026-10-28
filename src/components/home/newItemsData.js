export const NEW_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

export const isItemId = (value) => /^\d+$/.test(String(value));

export const fetchNewItems = async (signal) => {
  const response = await fetch(NEW_ITEMS_URL, { signal });
  if (!response.ok) throw new Error("Unable to load new items");
  const items = await response.json();
  // Fail closed on malformed records rather than show misleading item data.
  if (!Array.isArray(items) || items.some((item) =>
    !item || !isItemId(item.nftId) || !isItemId(item.authorId) ||
    typeof item.title !== "string" || !item.title.trim() ||
    typeof item.nftImage !== "string" || !item.nftImage ||
    typeof item.authorImage !== "string" || !item.authorImage ||
    !Number.isFinite(item.price) || item.price < 0 ||
    !Number.isFinite(item.likes) || item.likes < 0
  )) throw new Error("Invalid new items response");
  return items;
};
