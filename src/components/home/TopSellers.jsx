import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

const TopSellers = () => {
  AOS.init();
  const [topSellers, setTopSellers] = useState(new Array(12).fill("0"));
  const [isLoading, setIsLoading] = useState(true); // set initial value to true

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      )
      .then((res) => {
        setTopSellers(res.data);
        setIsLoading(false); // set to false after getting data
      });
  }, [isLoading]);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up" data-aos-duration="4000">
              <h2>
                Top Sellers
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol
              className="author_list"
              data-aos="fade-up"
              data-aos-duration="4000"
            >
              {topSellers.map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    {isLoading ? (
                      <div
                        className="skeleton-box"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      ></div>
                    ) : (
                      <Link to={`/author/${_.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={_.authorImage}
                          alt=""
                        />
                      </Link>
                    )}
                    <i className="fa fa-check"></i>
                  </div>
                  <div
                    className="author_list_info"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {isLoading ? (
                      <div
                        className="skeleton-box"
                        style={{ width: "100px", height: "20px" }}
                      ></div>
                    ) : (
                      <Link to={`/author/${_.authorId}`}>{_.authorName}</Link>
                    )}
                    {isLoading ? (
                      <div
                        className="skeleton-box"
                        style={{
                          width: "40px",
                          height: "20px",
                          marginTop: "8px",
                        }}
                      ></div>
                    ) : (
                      <span>{_.price} ETH</span>
                    )}
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
