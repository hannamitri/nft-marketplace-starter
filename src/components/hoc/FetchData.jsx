import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchData = ({ apiUrl, children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

 

  useEffect(() => {
    console.log("API_URL:", apiUrl)
    let isMounted = true;
    if(!apiUrl){
      return null
    }
    const fetchedData = async () => {
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
    fetchedData();
    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  useEffect(() => {
    if (!loading && data.length === 0) {
      console.log("Worked");
    }
  }, [loading, data]);

  return loading ? (
    <div className="container" id="section-collections">
      <div className="row">
        {[1, 2, 3, 4].map((index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <div className="nft_coll">
              <div className="nft_wrap skeleton-wrap">
                <div className="skeleton-img"></div>
              </div>
              <div className="nft_coll_pp">
                <div className="skeleton-avatar"></div>
              </div>
              <div className="nft_coll_info">
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    children(data)
  );
};

export default FetchData;
