import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import "./HotCollections.css";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const skeletonItems = new Array(12).fill(0);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
        const data = await response.json();
        setSellers(data);
      } catch (error) {
        setError('Failed to fetch top sellers');
        console.error('Error fetching top sellers:', error);
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
          <div className="col-md-12">
            {error && (
              <div className="text-center">
                <p className="text-danger">{error}</p>
              </div>
            )}
            {!error && (
              <ol className="author_list">
                {loading
                  ? skeletonItems.map((_, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <div className="hc-skeleton hc-skeleton__avatar" />
                        </div>
                        <div className="author_list_info">
                          <div className="hc-skeleton hc-skeleton__title" />
                          <div className="hc-skeleton hc-skeleton__subtitle" />
                        </div>
                      </li>
                    ))
                  : (sellers.length ? sellers : skeletonItems).map((seller, index) => (
                      <li key={seller.id || index}>
                        {sellers.length ? (
                          <>
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
                              <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                              <span>{seller.price} ETH</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="author_list_pp">
                              <div className="hc-skeleton hc-skeleton__avatar" />
                            </div>
                            <div className="author_list_info">
                              <div className="hc-skeleton hc-skeleton__title" />
                              <div className="hc-skeleton hc-skeleton__subtitle" />
                            </div>
                          </>
                        )}
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
