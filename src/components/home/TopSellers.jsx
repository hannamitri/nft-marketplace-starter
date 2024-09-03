import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TopSkeleton from "../UI/TopSkeleton";

const TopSellers = () => {
  const [topSellersData, setTopSellersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTopSellers() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setTopSellersData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
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
              {loading ? (
                Array(12)
                  .fill()
                  .map((_, index) => (
                    <div key={index}>
                      <TopSkeleton />
                    </div>
                  ))
              ) : (
                topSellersData.map((item) => (
                  <li key={item.id}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{item.authorName}</Link>
                      <span>{item.price} ETH</span>
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
