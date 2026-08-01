import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TOP_SELLERS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const TopSellerSkeleton = () => (
  <li className="top-seller-skeleton" aria-hidden="true">
    <div className="author_list_pp">
      <Skeleton width="50px" height="50px" borderRadius="50%" />
      <i className="fa fa-check"></i>
    </div>
    <div className="author_list_info">
      <Skeleton width="120px" height="16px" borderRadius="2px" />
      <Skeleton width="60px" height="14px" borderRadius="2px" />
    </div>
  </li>
);

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const { data } = await axios.get(TOP_SELLERS_URL);
        setSellers(data.slice(0, 12));
      } catch (requestError) {
        console.error("Unable to fetch top sellers:", requestError);
        setError("Unable to load top sellers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

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

          {error && (
            <div className="col-12 text-center" role="alert">
              <p>{error}</p>
            </div>
          )}

          <div className="col-md-12">
            <ol
              className="author_list"
              aria-busy={loading}
              aria-label="Top sellers"
            >
              {loading
                ? Array.from({ length: 12 }, (_, index) => (
                    <TopSellerSkeleton key={index} />
                  ))
                : sellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt={seller.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
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
