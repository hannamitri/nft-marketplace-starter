import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

async function getTopSellers() {
  try {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    );
    return response.data;
    // Data is already parsed and ready inside response.data
  } catch (error) {
    console.error("Request failed:", error.message);
  }
}

const TopSellers = () => {
  const [topSellers, settopSellers] = useState([]);
  useEffect(() => {
    getTopSellers().then(settopSellers);
  }, [topSellers]);
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
              {topSellers.map(
                ({ id, authorName, authorImage, authorId, price }, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{authorName}</Link>
                      <span>{price}</span>
                    </div>
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
