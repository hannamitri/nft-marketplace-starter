import { useEffect, useState } from "react";
import { EXPLORE_API_URL, normalizeExploreItem } from "./useAuthorNfts";

/**
 * Load a single NFT from the explore API by nftId (for item details page).
 */
export function useExploreItem(nftId) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(Boolean(nftId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (nftId == null || nftId === "") {
      setItem(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const idStr = String(nftId);

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(EXPLORE_API_URL, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          setItem(null);
          return;
        }
        const found = data
          .map(normalizeExploreItem)
          .find((row) => String(row.nftId) === idStr);
        setItem(found || null);
      } catch (e) {
        if (e.name === "AbortError") return;
        setError(e.message || "Failed to load item");
        setItem(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => controller.abort();
  }, [nftId]);

  return { item, loading, error };
}
