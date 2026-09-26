import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setSellers(response.data || []);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      } finally {
        setLoading(false);
        setTimeout(() => {
          AOS.refreshHard();
        }, 150);
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

          <div className="col-md-12" data-aos="fade-up">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        ></div>
                      </div>
                      <div className="author_list_info">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "100px",
                            height: "16px",
                            marginBottom: "6px",
                          }}
                        ></div>
                        <div
                          className="skeleton-box"
                          style={{ width: "60px", height: "14px" }}
                        ></div>
                      </div>
                    </li>
                  ))
                : Array.isArray(sellers) &&
                  sellers.map((seller) => {
                    const authorId = seller.authorId || seller.id;

                    return (
                      <li key={authorId || seller.authorName}>
                        <div className="author_list_pp">
                          <Link to={`/author/${authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={
                                seller.authorImage ||
                                "https://via.placeholder.com/50"
                              }
                              alt={seller.authorName || "Author"}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to={`/author/${authorId}`}>
                            {seller.authorName || "Unknown Author"}
                          </Link>
                          <span>{seller.price ?? "0"} ETH</span>
                        </div>
                      </li>
                    );
                  })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

