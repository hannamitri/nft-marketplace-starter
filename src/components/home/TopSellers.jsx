import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Top Sellers");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Top Sellers:", data);

        setSellers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Top Sellers Error:", error);
        setLoading(false);
      });
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
          
            {loading && (
              <ol className="author_list">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          background: "#e5e5e5",
                          animation:
                            "topSellersSkeletonPulse 1.5s ease-in-out infinite",
                        }}
                      ></div>
                    </div>

                    <div className="author_list_info">
                      <div
                        style={{
                          width: "120px",
                          height: "16px",
                          background: "#e5e5e5",
                          borderRadius: "4px",
                          marginBottom: "8px",
                          animation:
                            "topSellersSkeletonPulse 1.5s ease-in-out infinite",
                        }}
                      ></div>

                      <div
                        style={{
                          width: "70px",
                          height: "14px",
                          background: "#e5e5e5",
                          borderRadius: "4px",
                          animation:
                            "topSellersSkeletonPulse 1.5s ease-in-out infinite",
                        }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ol>
            )}

         
            {!loading && sellers.length > 0 && (
              <ol className="author_list">
                {sellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.name || "Top seller"}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <Link to="/author">
                        {seller.name || seller.author || "Top Seller"}
                      </Link>

                      <span>
                        {seller.price ?? seller.total ?? seller.eth ?? "0"} ETH
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            )}

          
            {!loading && sellers.length === 0 && (
              <div className="text-center">
                <p>No top sellers found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes topSellersSkeletonPulse {
            0% {
              opacity: 1;
            }

            50% {
              opacity: 0.5;
            }

            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </section>
  );
};

export default TopSellers;