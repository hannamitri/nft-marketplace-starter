import React, { useState, useEffect } from "react";
import axios from "axios";
import TopSeller from "../UI/TopSeller";

const TopSellers = () => {
  const [topSellersData, setTopSellersData] = useState();
  const [loading, setLoading] = useState(false);

  const getTopSellersData = async () => {
    try {
      setLoading(true);
      await axios
        .get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
        )
        .then(({ data }) => {
          setTopSellersData(data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getTopSellersData();
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
              {topSellersData?.map((topSellerData, id) => (
                <TopSeller
                  topSellersData={topSellerData}
                  loading={loading}
                  key={id}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
