import { useState, useEffect } from "react";
import { fetchTopSellers } from "../services/nftApi";

export const useTopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTopSellers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTopSellers();
        setSellers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTopSellers();
  }, []);

  return { sellers, loading, error };
};