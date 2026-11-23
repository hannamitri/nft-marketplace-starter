const EXPLORE_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

export const fetchExploreItems = async (filter = "") => {
  const url = filter
    ? `${EXPLORE_ITEMS_URL}?filter=${encodeURIComponent(filter)}`
    : EXPLORE_ITEMS_URL;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load explore items (${response.status})`);
  }

  const items = await response.json();

  if (!Array.isArray(items)) {
    throw new Error("The explore API returned an invalid response");
  }

  return items;
};
