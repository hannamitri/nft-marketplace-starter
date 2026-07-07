import { useEffect, useMemo, useState } from "react";
import { buildExploreUrl, MIN_SKELETON_MS } from "../constants/api";

const dedupeExploreItems = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.id ?? item.nftId;
    if (key === undefined || key === null || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

const useExploreNfts = (options = {}) => {
  const filter = options.filter ?? "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const minTimer = new Promise((resolve) => {
      setTimeout(resolve, MIN_SKELETON_MS);
    });

    const run = async () => {
      try {
        setLoading(true);
        setError("");
        setItems([]);

        const response = await fetch(buildExploreUrl(filter), {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Explore request failed: ${response.status}`);
        }
        const payload = await response.json();
        if (!Array.isArray(payload)) {
          throw new Error("Explore API returned invalid payload.");
        }
        setItems(payload);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setItems([]);
          setError("Unable to load NFTs right now. Please try again soon.");
        }
      } finally {
        await minTimer;
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    run();
    return () => controller.abort();
  }, [filter]);

  const uniqueItems = useMemo(() => dedupeExploreItems(items), [items]);
  return { uniqueItems, loading, error };
};

export default useExploreNfts;
