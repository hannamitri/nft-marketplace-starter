import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState ([]);

async function getTopSellers() {
  const { data } = await axios.get(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
  );

console.log(data);
setSellers(data);
}

useEffect (() => {
  getTopSellers();
},[]);

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
              {sellers.length === 0 ? (
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <Skeleton width="100%" height="60px" borderRadius="10px" />
                  </li>
                ))
              ) : (
                sellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{seller.authorName}</Link>
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
