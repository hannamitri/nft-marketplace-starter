import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import { TOP_SELLERS_URL } from "./topSellersApi";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadSellers = async () => {
      try {
        const response = await fetch(TOP_SELLERS_URL, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Top sellers request failed (${response.status})`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Top sellers response was not a list");
        }

        setSellers(data);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          console.error("Failed to load top sellers:", requestError);
          setError("Top sellers could not be loaded.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadSellers();
    return () => controller.abort();
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
            {isLoading && (
              <div role="status">
                <span className="visually-hidden">Loading top sellers...</span>
                <ol className="author_list top-sellers__skeleton" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width="110px" height="16px" borderRadius="4px" />
                        <br />
                        <Skeleton width="65px" height="14px" borderRadius="4px" />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {error && <div role="alert">{error}</div>}
            {!isLoading && !error && sellers.length === 0 && (
              <div>No top sellers available.</div>
            )}
            {sellers.length > 0 && (
              <ol className="author_list">
                {sellers.map((seller) => (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
