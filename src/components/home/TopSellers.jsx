import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchtopSellers() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setTopSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchtopSellers();
  }, []);

  // new Array(12).fill(0).map((_, index)

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
                    <div className="skeleton-box author_list_pp-skeleton"></div>
                  </div>
                  <div className="author_list_info">
                    <div className="skeleton-box author_list_info-skeleton"></div>
                    <span>
                      <div className="skeleton-box top_seller-price-skeleton"></div>
                    </span>
                  </div>
                </li>))
              
              :
                            
              topSellers.map((topSeller) => (
                <li key={topSeller.id}>
                  <div className="author_list_pp">
                    <Link to={`author/${topSeller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={topSeller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={{pathname: `author/${topSeller.authorId}`}}>{topSeller.authorName}</Link>
                    <span>{topSeller.price} ETH</span>
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
