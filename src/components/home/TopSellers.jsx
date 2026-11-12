
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Top Sellers API
  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      )
      .then((response) => {
        setSellers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top sellers:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">

          {/* Section heading */}
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* Sellers */}
          <div className="col-md-12">
            <ol className="author_list">

              {/* Skeleton Loading */}
              {isLoading &&
                Array.from({ length: 12 }).map((_, index) => (
                  <li key={index}>
                    <div className="skeleton skeleton-avatar"></div>

                    <div className="author_list_info">
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  </li>
                ))}

              {/* Actual Sellers */}
              {!isLoading &&
                sellers.map((seller) => (
                  <li key={seller.id}
                  data-aos="fade-up">
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage || AuthorImage}
                          alt={seller.authorName || "Seller"}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <Link to="/author">
                        {seller.authorName}
                      </Link>

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
