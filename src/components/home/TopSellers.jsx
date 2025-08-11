import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  const getTopSellers = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
      );
      setTopSellers(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching New Items", error);
    }
  };

  useEffect(() => {
    getTopSellers();
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
              {topSellers.length > 0
                ? topSellers.map((seller, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId || ""}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage || AuthorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId || ""}`}>
                          {seller.authorName || "Unknown"}
                        </Link>
                        <span>{seller.price || "0"} ETH</span>
                      </div>
                    </li>
                  ))
                : new Array(12).fill(0).map((_, index) => (
                    <li key={index} className="skeleton-seller">
                      <div className="skeleton-seller-avatar"></div>
                      <div className="skeleton-seller-info">
                        <div className="skeleton-seller-name"></div>
                        <div className="skeleton-seller-eth"></div>
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
