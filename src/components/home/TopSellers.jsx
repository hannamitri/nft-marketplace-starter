import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Skeleton Loader
const TopSellersSkeleton = () => {
  return (
    <ol className="author_list">
      {Array.from({ length: 12 }).map((_, i) => (
        <li key={i}>
          <div className="author_list_pp">
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#e3e3e3",
                borderRadius: "50%",
              }}
            ></div>
          </div>
          <div className="author_list_info">
            <div
              style={{
                width: "100px",
                height: "15px",
                backgroundColor: "#e3e3e3",
                borderRadius: "6px",
                marginBottom: "6px",
              }}
            ></div>
            <div
              style={{
                width: "60px",
                height: "12px",
                backgroundColor: "#e3e3e3",
                borderRadius: "6px",
              }}
            ></div>
          </div>
        </li>
      ))}
    </ol>
  );
};

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setSellers(res.data);
      } catch (error) {
        console.error("Failed to load top sellers", error);
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
          <div className="col-lg-12 text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="col-md-12">
            {loading ? (
              <TopSellersSkeleton />
            ) : (
              <ol className="author_list">
                {sellers.map((seller) => (
                  <li key={seller.authorId}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                          onError={(e) =>
                            (e.currentTarget.src = "/fallback-author.png")
                          }
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>
                        {seller.authorName || "Unknown"}
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

