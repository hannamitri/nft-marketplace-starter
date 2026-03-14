import { useState, useEffect } from "react";
import { fetchHotCollections } from "../services/nftApi";


export const useHotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHotCollections = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchHotCollections();
        setCollections(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHotCollections();
  }, []);

  return { collections, loading, error };
};