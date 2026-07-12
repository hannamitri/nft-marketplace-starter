import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setSellers(data);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      } finally {
        setLoading(false);
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
            <ol className="author_list">

              {/* LOADING SKELETON */}
              {loading &&
                new Array(12).fill(0).map((_, index) => (
                  <li key={`loading-${index}`}>
                    <div className="author_list_pp">
                      <div className="skeleton-box"
                        style={{ width: 50, height: 50,borderRadius: "50%"}}
                      ></div>
                    </div>
                    <div className="author_list_info">
                      <div className="skeleton-box" 
                      style={{width: "70%", height: 18, marginBottom: 8}}
                      ></div>
                      <div className="skeleton-box"
                        style={{ width: "40%", height: 16}}
                      ></div>
                    </div>
                  </li>
                ))
              }

              {/* REAL API DATA */}
              {!loading &&
                sellers.map((seller, index) => (
                  <li key={index}>
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
