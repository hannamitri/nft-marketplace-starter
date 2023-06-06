import React, { useEffect, useState } from "react";
import axios from "axios";
import TopSeller from "../utility/TopSeller";
import TopSellerLoadingState from "../utility/TopSellerLoadingState";

const TopSellers = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState();

  async function getSellersData() {
    isLoading(true);
    let { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setData(data);
    setTimeout(() => {
      isLoading(false);
    }, 2000);
  }

  useEffect(() => {
    getSellersData();
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
              {!loading
                ? data.map((seller) => 
                    <TopSeller seller={seller} key={seller.id} />
                  )
                : new Array(data.length).fill(0).map((_, index) => 
                    <TopSellerLoadingState key={index} />
                  )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
