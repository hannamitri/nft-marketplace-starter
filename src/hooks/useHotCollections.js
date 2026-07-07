import { useEffect, useState } from "react";
import axios from "axios";

const API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

export default function useHotCollections() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API);
        const result = res?.data || [];
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  return { data, loading, error };
}