import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTopSellers() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );

        const sellers = Array.isArray(data) ? data : [];

        setTopSellers(sellers);

        if (sellers.length === 0) {
          setError("No top sellers are available right now.");
        }
      } catch (error) {
        console.error("Failed to fetch top sellers:", error);
        setError("Unable to load top sellers right now.");
      } finally {
        setLoading(false);
      }
    }

    fetchTopSellers();
  }, []);

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
          <div className="col-md-12">
            {error ? (
              <p className="text-center">{error}</p>
            ) : (
              <ol className="author_list">
                {loading
                  ? new Array(12).fill(0).map((_, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </div>
                        <div className="author_list_info">
                          <Skeleton width="120px" height="16px" />
                          <Skeleton width="65px" height="14px" />
                        </div>
                      </li>
                    ))
                  : topSellers.map((seller, index) => (
                      <li
                        key={seller.id}
                        data-aos="fade-up"
                        data-aos-delay={(index % 4) * 50}
                      >
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
