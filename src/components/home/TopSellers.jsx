import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";




const TOP_SELLERS_API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchTopSellers() {
      try {
        setIsLoading(true);
        setError("");

        const response = await axios.get(TOP_SELLERS_API);
        

        if (isMounted) {
          setSellers(
            Array.isArray(response.data)
              ? response.data.slice(0, 12)
              : []
          );
        }
      } catch (fetchError) {
        console.error(
          "Unable to load top sellers:",
          fetchError
        );

        if (isMounted) {
          setError(
            "Top sellers could not be loaded. Please try again later."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchTopSellers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="section-popular"
      className="pb-5"
      aria-labelledby="top-sellers-heading"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 id="top-sellers-heading">
                Top Sellers
              </h2>

              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-md-12">
            {isLoading && (
              <ol
                className="author_list top-sellers-loading"
                aria-label="Loading top sellers"
              >
                {Array.from({ length: 12 }).map(
                  (_, index) => (
                    <li
                      key={index}
                      className="top-seller-loading-item"
                    >
                      <span className="top-seller-loading-rank skeleton-shimmer"></span>

                      <div className="top-seller-loading-avatar skeleton-shimmer"></div>

                      <div className="top-seller-loading-copy">
                        <div className="top-seller-loading-name skeleton-shimmer"></div>

                        <div className="top-seller-loading-price skeleton-shimmer"></div>
                      </div>
                    </li>
                  )
                )}
              </ol>
            )}

            {!isLoading && error && (
              <p className="text-center">{error}</p>
            )}

            {!isLoading &&
              !error &&
              sellers.length === 0 && (
                <p className="text-center">
                  No top sellers are currently available.
                </p>
              )}

            {!isLoading &&
              !error &&
              sellers.length > 0 && (
                <ol className="author_list">
                  {sellers.map((seller, index) => {
                    const authorId =
                      seller.authorId ||
                      seller.id ||
                      index;

                    const sellerImage =
                      seller.authorImage ||
                      seller.image ||
                      seller.avatar;

                    const sellerName =
                      seller.authorName ||
                      seller.name ||
                      "Unknown Seller";

                    const sellerPrice =
                      seller.price ||
                      seller.eth ||
                      seller.volume;

                    return (
                      <li key={seller.id || authorId}>
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${authorId}`}
                            state={{ seller }}
                          >
                            <img
                              className="lazy pp-author"
                              src={sellerImage}
                              alt={`${sellerName} profile`}
                            />

                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link
                            to={`/author/${authorId}`}
                            state={{ seller }}
                          >
                            {sellerName}
                          </Link>

                          <span>{sellerPrice} ETH</span>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
