import React, { useState, useEffect } from "react";
import axios from "axios";
import TopSeller from "./top-sellers/TopSeller";
import TopSellerSkeleton from "./top-sellers/TopSellerSkeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
      const [loading, setLoading] = useState(false);
      
    
      async function getData() {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setTopSellers(data);
        setLoading(false);
      }
    
      useEffect(() => {
        setLoading(true);
        getData();
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
              {loading ? (new Array(12).fill(0).map((_, index) => <TopSellerSkeleton key={index} />)) : (
                            topSellers.map((topSeller, index) => <TopSeller topSeller={topSeller} key={index} />)
                          )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
