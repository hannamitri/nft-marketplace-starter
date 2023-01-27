import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./HotCollections.css";

const HotCollections = () => {
  const [hotCollectionsData, setHotCollectionsData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAPI() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollectionsData(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchAPI();
  }, []);

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

          {!loading && (
            <OwlCarousel
              className="owl-theme"
              loop
              nav
              margin={8}
              dots={false}
              responsiveClass
              responsive={{
                0: {
                  items: 1,
                },

                480: {
                  items: 2,
                },

                1000: {
                  items: 3,
                },

                1200: {
                  items: 4,
                },
              }}
            >
              {hotCollectionsData?.map((item) => (
                <div className="item" key={item.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
          {loading && (
            <OwlCarousel
              loop
              nav
              margin={8}
              dots={false}
              responsiveClass
              responsive={{
                0: {
                  items: 1,
                },
                480: {
                  items: 2,
                },
                1000: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              }}
            >
              {new Array(5).fill(0).map((_, index) => {
                return (
                  <div className="item" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div
                          className="skeleton-box"
                          style={{ width: "100%", height: "200px" }}
                        ></div>
                      </div>
                      <div className="nft_coll_pp">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div
                        className="nft_coll_info"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          className="skeleton-box"
                          style={{ height: "20px", width: "50%" }}
                        ></div>
                        <div
                          className="skeleton-box"
                          style={{
                            height: "20px",
                            width: "30%",
                            marginTop: "12px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
