import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [sellers, topSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const skeletonCount = sellers.length || 12;

  async function getSellers() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    topSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    getSellers();
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
              {loading ? (
                Array.from({ length: skeletonCount }).map((_, i) => (
                  <li key={i}>
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
                          height: "20px",
                        }}
                      ></div>
                    </div>

                    <span className="author_list_info">
                      {" "}
                      <div
                        className="skeleton-box"
                        style={{
                          width: "40px",
                          height: "20px",
                        }}
                      ></div>
                    </span>
                  </li>
                ))
              ) : (
                <>
                  {sellers.map((seller, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{seller.authorName}</Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
                  
                </>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TopSellers;
