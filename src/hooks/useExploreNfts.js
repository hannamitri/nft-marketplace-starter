import { useEffect, useMemo, useState } from "react";
import { EXPLORE_API_URL, MIN_SKELETON_MS } from "../constants/api";

const EXPLORE_FILTER_VALUES = [
  "price_low_to_high",
  "price_high_to_low",
  "likes_high_to_low",
];

const buildExploreUrl = (filter) => {
  const trimmed = typeof filter === "string" ? filter.trim() : "";
  if (!trimmed || !EXPLORE_FILTER_VALUES.includes(trimmed)) {
    return EXPLORE_API_URL;
  }
  const params = new URLSearchParams({ filter: trimmed });
  return `${EXPLORE_API_URL}?${params.toString()}`;
};

const dedupeExploreItems = (list) => {
  const seen = new Set();
  return list.filter((item) => {
    const uniqueId = item.id ?? item.nftId;
    if (uniqueId === undefined || uniqueId === null || seen.has(uniqueId)) {
      return false;
    }
    seen.add(uniqueId);
    return true;
  });
};

/**
 * Fetches explore NFT list with a minimum 1s loading phase for skeleton UI.
 * @param {{ filter?: string }} [options]
 * @param {string} [options.filter] - One of price_low_to_high | price_high_to_low | likes_high_to_low, or "" for default ordering.
 */
const useExploreNfts = (options = {}) => {
  const filter = options.filter ?? "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const minDisplayPromise = new Promise((resolve) => {
      setTimeout(resolve, MIN_SKELETON_MS);
    });

    const loadExploreItems = async () => {
      try {
        setLoading(true);
        setError("");
        setItems([]);

        const requestUrl = buildExploreUrl(filter);
        const response = await fetch(requestUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Explore API request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (!Array.isArray(payload)) {
          throw new Error("Explore API returned an invalid response.");
        }

        setItems(payload);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError("Unable to load NFTs right now. Please try again soon.");
          setItems([]);
        }
      } finally {
        await minDisplayPromise;
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadExploreItems();

    return () => controller.abort();
  }, [filter]);

  const uniqueItems = useMemo(() => dedupeExploreItems(items), [items]);

  return { uniqueItems, loading, error };
};

export default useExploreNfts;
