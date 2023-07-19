import React, { useEffect, useState } from "react";
import axios from "axios";
import Seller from "../UI/Seller";

const TopSellers = () => {
  const [sellers, setSellers] = useState([])

  async function fetchSellers() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")

    setSellers(data)
  }

  useEffect(() => {
    fetchSellers()
  })
  
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
              {sellers.map((seller) => (
                <Seller seller={seller} key={seller.id} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
