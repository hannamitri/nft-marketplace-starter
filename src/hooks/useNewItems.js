import { useState, useEffect } from "react";
import { fetchNewItems } from "../services/nftApi";

/**
 * Custom hook to fetch new items from the NFT marketplace API
 * @returns {{ items: Array, loading: boolean, error: string|null }}
 */
export const useNewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNewItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNewItems();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadNewItems();
  }, []);

  return { items, loading, error };
};