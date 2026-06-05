import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton"; // Clean relative path mapping to your UI folder

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        if (!response.ok) throw new Error("Network response error");
        const data = await response.json();
        setSellers(data);
      } catch (error) {
        console.error("Error pulling live data from the topSellers API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

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
          <div className="col-md-12">
            <ol className="author_list">
              
              {/* 1. SKELETON SHIMMER LOADING PHASE */}
              {loading ? (
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    {/* Rounded Avatar Circle Placeholder */}
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    {/* Double Stacked Typography Line Placeholders */}
                    <div className="author_list_info" style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "4px" }}>
                      <Skeleton width="100px" height="16px" borderRadius="4px" />
                      <Skeleton width="50px" height="12px" borderRadius="4px" />
                    </div>
                  </li>
                ))
              ) : (

                /* 2. LIVE DYNAMIC DATA PHASE */
                sellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))
              )}

            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;