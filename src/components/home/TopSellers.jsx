import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    )
      .then((res) => res.json())
      .then((data) => {
        setTopSellers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("topSellers error:", err);
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
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div className="skeleton-avatar skeleton-shimmer"></div>
                      </div>
                      <div className="author_list_info">
                        <div className="skeleton-line skeleton-shimmer skeleton-line--name"></div>
                        <div className="skeleton-line skeleton-shimmer skeleton-line--price"></div>
                      </div>
                    </li>
                  ))
                : topSellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
