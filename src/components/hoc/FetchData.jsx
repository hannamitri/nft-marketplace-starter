import React, { useEffect, useState } from "react";
import axios from "axios";
import SkeletonLoader from "../UI/SkeletonComponent";

const FetchData = ({ apiUrl, children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (!apiUrl) {
      return null;
    }
    const fetchData = async () => {
      try {
        const { data } = await axios.get(apiUrl);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log("Error Message:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  return loading ? (
    <SkeletonLoader />
  ) : (
    children(data)
  );
};

export default FetchData;
