import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopSellers() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      console.log(data);
      setTopSellers(data);
      setLoading(false);
    } catch {
      setLoading(false);
      console.error("We had trouble pulling the Top Sellers");
    }
  }

  useEffect(() => {
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
              {loading ? new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                      <div
                        className="lazy pp-author topSellers__authorImage--skeleton skeleton"
                      />
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="author_list_info">
                    <div className="topSellers__title--skeleton skeleton"></div>
                    <span className="topSellers__price--skeleton skeleton"></span>
                  </div>
                </li>
              )):(
             topSellers.map(({ authorName, authorImage, authorId, price }) => (
                  <li key={authorId}>
                    <div className="author_list_pp">
                         <Link to={`/author/${authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                         <Link to={`/author/${authorId}`}>{authorName}</Link>
                      <span>{price} ETH</span>
                    </div>
                  </li>
              )))
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
