import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );

        console.log("Top Sellers API data:", response.data);

        setSellers(
          Array.isArray(response.data) ? response.data : []
        );
      } catch (error) {
        console.error("Error fetching top sellers:", error);
        setError("Unable to load top sellers.");
      } finally {
        // Keep skeleton visible for at least 1 second
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchSellers();
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
            {error ? (
              <p>{error}</p>
            ) : (
              <ol className="author_list">
                {loading
                  ? new Array(12).fill(0).map((_, index) => (
                      <li className="seller-skeleton" key={index}>
                        <div className="author_list_pp">
                          <div className="skeleton seller-skeleton-image"></div>
                        </div>

                        <div className="author_list_info">
                          <div className="skeleton seller-skeleton-name"></div>
                          <div className="skeleton seller-skeleton-price"></div>
                        </div>
                      </li>
                    ))
                  : sellers.map((seller) => (
                      <li key={seller.id}>
                        <div className="author_list_pp">
                          <Link to="/author" state={{ author: seller }}>
                            <img
                              className="lazy pp-author"
                              src={seller.authorImage}
                              alt={seller.authorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to="/author" state={{ author: seller }}>
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
