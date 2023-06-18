import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function main() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setTopSellers(data);
      setLoading(false);
    }
    setTimeout(() => {
      main();
    }, 2000);
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              data-aos="fade-in"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-offset="300"
            >
              <div className="text-center">
                <h2>Top Sellers</h2>
                <div
                  style={{ height: "2.5px" }}
                  className="small-border bg-color-2"
                ></div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-offset="300"
            >
              <ol className="author_list">
                {!loading
                  ? topSellers.map((sellers, index) => {
                      return (
                        <li key={index}>
                          <div className="author_list_pp">
                            <Link to={`/author/${sellers.authorId}`}>
                              <img
                                className="lazy pp-author"
                                src={sellers.authorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${sellers.authorId}`}>
                              {sellers.authorName}
                            </Link>
                            <span>{sellers.price} ETH</span>
                          </div>
                        </li>
                      );
                    })
                  : new Array(12).fill(0).map((_, index) => {
                      return (
                        <li key={index}>
                          <div className="author_list_pp">
                            <div
                              style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                borderRadius: "100%",
                              }}
                              className="lazy pp-author skeleton-box"
                              alt=""
                            ></div>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <div
                              className="skeleton-box"
                              style={{
                                width: "50%",
                                height: "20px",
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                borderRadius: "4px",
                              }}
                              to="/author"
                            ></div>
                            <div
                              className="skeleton-box"
                              style={{
                                width: "30%",
                                height: "20px",
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                borderRadius: "4px",
                                marginTop: "10px",
                              }}
                            ></div>
                          </div>
                        </li>
                      );
                    })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
