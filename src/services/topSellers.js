const TOP_SELLERS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

export const fetchTopSellers = async () => {
  const response = await fetch(TOP_SELLERS_URL);

  if (!response.ok) {
    throw new Error(`Failed to load sellers (${response.status})`);
  }

  const sellers = await response.json();

  if (!Array.isArray(sellers)) {
    throw new Error("The sellers API returned an invalid response");
  }

  return sellers;
};
