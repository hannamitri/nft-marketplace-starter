import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import { fetchTopSellers } from "../../services/marketplace";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetchTopSellers()
      .then((data) => {
        if (isMounted) {
          setSellers(data);
          setLoading(false);
        }
      })
      .catch((fetchError) => {
        console.error("Unable to load top sellers:", fetchError);
        if (isMounted) {
          setError("Top sellers could not be loaded. Please try again later.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
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
            {loading ? (
              <div role="status" aria-label="Loading top sellers">
                <ol className="author_list" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>
                      <div className="author_list_info">
                        <Skeleton
                          width="110px"
                          height="14px"
                          borderRadius="4px"
                        />
                        <br />
                        <Skeleton
                          width="48px"
                          height="12px"
                          borderRadius="4px"
                        />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : error ? (
              <p role="alert">{error}</p>
            ) : sellers.length === 0 ? (
              <p>No top sellers are available right now.</p>
            ) : (
              <ol className="author_list">
                {sellers.map((seller) => (
                  <li key={seller.authorId}>
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${seller.authorId}`}
                        title={`View ${seller.authorName}'s profile`}
                      >
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check" aria-hidden="true"></i>
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
