import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState(new Array(6).fill("0"))
  const [isLoading, setIsLoading] = useState(true); // set initial value to true

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((res) => {
        setHotCollections(res.data);
        setIsLoading(false); // set to false after getting dat
      });
  }, [isLoading]);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl-rtl" {...options}>
            {hotCollections.map((elem, index) => (
              <div key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    {isLoading ? (
                      <div
                        className="skeleton-box"
                        style={{ width: "100%", height: "200px" }}
                      ></div>
                    ) : (
                      <Link to={`/item-details/${elem.nftId}`}>
                        <img
                          src={elem.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    )}
                  </div>
                  <div className="nft_coll_pp">
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
                      <Link to={`/author/${elem.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={elem.authorImage}
                          alt=""
                        />
                      </Link>
                    )}

                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    {isLoading ? (
                      <>
                        <div
                          className="skeleton-box"
                          style={{ width: "100px", height: "20px" }}
                        ></div>
                      </>
                    ) : (
                      <>
                        <Link to={`/explore/${elem.nftId}`}>
                          <h4>{elem.title}</h4>
                        </Link>
                      </>
                    )}
                    {isLoading ? (
                      <>
                        <div
                          className="skeleton-box"
                          style={{
                            width: "60px",
                            height: "20px",
                            display: "flex",
                            margin: "0 auto",
                          }}
                        ></div>
                      </>
                    ) : (
                      <span>ERC-{elem.code}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
