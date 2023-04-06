import React, { useEffect, useState, Component } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const { id } = useParams();
  const [hotcollection, setHotCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchHotCollection() {
    const res = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    const { data } = res;
    setHotCollection(data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchHotCollection();
  }, []);

  const carousel = {
    items: 4,
    loop: true,
    margin: 8,
    nav: true,
    dots: false,
    rewind: false,
    responsive: {
      1200: {
        items: 4,
      },
      992: {
        items: 3,
      },
      768: {
        items: 2,
      },
      0: {
        items: 1,
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
          {isLoading ? (
            <>
              <OwlCarousel className="owl-theme" {...carousel}>
                {new Array(4).fill(0).map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div
                          className="skeleton-wrap"
                          style={{ width: "100%", height: "240px" }}
                        ></div>
                      </div>
                      <div className="nft_coll_pp">
                        <div
                          className="skeleton_coll_pp"
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <div className="skeleton_coll_info">
                          <div
                            className="skeleton-title"
                            style={{
                              width: "200px",
                              height: "20px",
                              marginBottom: "8px",
                            }}
                          ></div>
                          <div
                            className="skeleton-code"
                            style={{ width: "100px", height: "20px" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          ) : (
            <OwlCarousel className="owl-theme" {...carousel}>
              {hotcollection.map((nft) => (
                <div key={nft.nftId}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={nft.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={nft.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{nft.title}</h4>
                      </Link>
                      <span>ERC-{nft.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
