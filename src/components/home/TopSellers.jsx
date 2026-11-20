import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        { signal: controller.signal }
      )
      .then((response) => {
        console.log("Top Sellers:", response.data);

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid top sellers data");
        }

        setSellers(response.data);
      })
      .catch((error) => {
        if (
          error.code === "ERR_CANCELED" ||
          error.name === "CanceledError"
        ) {
          return;
        }

        console.error("Error fetching top sellers:", error);
        setError("Unable to load top sellers.");
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

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
            {error && <p>{error}</p>}

            <ol className="author_list">
              {loading
                ? Array.from({ length: 12 }, (_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div
                          className="top-seller-skeleton-avatar"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundColor: "#e5e5e5",
                          }}
                        />
                      </div>

                      <div className="author_list_info">
                        <div
                          style={{
                            width: "120px",
                            height: "16px",
                            backgroundColor: "#e5e5e5",
                            borderRadius: "4px",
                            marginBottom: "10px",
                          }}
                        />

                        <div
                          style={{
                            width: "70px",
                            height: "14px",
                            backgroundColor: "#e5e5e5",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    </li>
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