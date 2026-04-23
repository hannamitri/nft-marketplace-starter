import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top sellers.");
        }

        const data = await response.json();
        setSellers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  const skeletonItems = Array.from({ length: 12 });

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos="fade-left" data-aos-delay="100">
            <ol className="author_list">
              {loading && skeletonItems.map((_, index) => (
                <li key={`seller-skeleton-${index}`}>
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  </div>
                  <div className="author_list_info">
                    <Skeleton width="120px" height="18px" borderRadius="4px" />
                    <div className="mt-2">
                      <Skeleton width="70px" height="16px" borderRadius="4px" />
                    </div>
                  </div>
                </li>
              ))}
              {!loading && error && (
                <li className="text-danger">{error}</li>
              )}
              {!loading && !error && sellers.map((seller, index) => (
                <li key={seller.id} data-aos="fade-left" data-aos-delay={(index % 6) * 70}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`} title={`Author ID: ${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt={seller.authorName?.trim() || "Author"}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>{seller.authorName?.trim()}</Link>
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
