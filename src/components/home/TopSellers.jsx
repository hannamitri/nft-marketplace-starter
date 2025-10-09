import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TopSellers.css";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTopSellers() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setTopSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    getTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      {loading ? (
        <div className="skeleton__loading">
          <div className="skeleton__title"></div>
          <div className="small-border bg-color-2"></div>
          <div className="col-md-12">
            <div className="author_list">
              {Array.from({ length: 12 }).map((_, index) => (
                <div className="skeleton__items" key={index}>
                  <div className="skeleton__left">
                    <div className="skeleton__img"></div>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="skeleton__right">
                    <div className="skeleton__name"></div>
                    <div className="skeleton__price"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div data-aos="fade-up" className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Top Sellers</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-md-12">
              <ol className="author_list">
                {topSellers.map((topSeller, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${topSeller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={topSeller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${topSeller.authorId}`}>
                        {topSeller.authorName}
                      </Link>
                      <span>{topSeller.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TopSellers;
