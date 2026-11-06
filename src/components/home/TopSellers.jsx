import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const TopSellers = ({ loading: propLoading = false }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
        .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
  }, []);
  
  if (error) return <p>Error: {error}</p>;

  const skeletonItems = Array.from({ length: 4 });
  
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {propLoading || isLoading ? (
            skeletonItems.map((_, index) => (
              <div className="col-md-12" key={index}>
                <ol className="author_list">
                  <div className="author_list_pp">
                    <Skeleton width="100%" height="180px" borderRadius="12px" />
                  </div>
                  <div className="author_list_info">
                    <Skeleton width="70%" height="20px" borderRadius="6px" />
                    <Skeleton width="40%" height="16px" borderRadius="6px" />
                  </div>
                </ol>
              </div>
            ))
          ) : (
          <div className="col-md-12">
            <ol className="author_list">
              {data.map((item) => (
                <li key={item.id}>
                  <div className="author_list_pp">  
                    <Link to="/author/">
                      <img 
                        src={item.authorImage} 
                        alt="collection creator" 
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          )}
      </div>
    </div>
 </section>
  );
};

export default TopSellers;
