import { useEffect, useState } from "react";
import { EXPLORE_API_URL, normalizeExploreItem } from "./useAuthorNfts";

let cachedItems = null;
let cachedError = null;
let inFlight = null;

async function fetchExploreItems(signal) {
  if (cachedItems) return cachedItems;
  if (cachedError) throw new Error(cachedError);
  if (inFlight) return inFlight;

  inFlight = fetch(EXPLORE_API_URL, { signal })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }
      return res.json();
    })
    .then((data) => {
      cachedItems = Array.isArray(data) ? data.map(normalizeExploreItem) : [];
      return cachedItems;
    })
    .catch((e) => {
      if (e.name === "AbortError") throw e;
      cachedError = e.message || "Failed to load explore items";
      throw e;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}

export function useExploreItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchExploreItems(controller.signal);
        setItems(data);
      } catch (e) {
        if (e.name === "AbortError") return;
        setError(e.message || "Failed to load explore items");
        setItems([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { items, loading, error };
}
