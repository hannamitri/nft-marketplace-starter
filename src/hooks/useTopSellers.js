import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

export default function useTopSellers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API);
        if (isMounted) setData(res?.data || []);
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