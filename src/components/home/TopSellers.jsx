import React, { useEffect, useState } from "react";
import axios from "axios";
import TopSellerCard from "./TopSellerCard";
import TopSellersSkeleton from "./TopSellersSkeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
      )
      .then((response) => {
        setSellers(response.data);
      })
      .catch((error) => {
        console.error("Unable to load top sellers:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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
              {loading ? (
                <TopSellersSkeleton />
              ) : (
                sellers.map((seller) => (
                  <TopSellerCard key={seller.id} seller={seller} />
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
