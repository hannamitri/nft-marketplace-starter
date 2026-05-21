import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import OwlCarousel from "react-owl-carousel";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );

        setCollections(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      }
    };
    fetchCollections();
  }, []);

  
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
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

          <div className="col-lg-12">
            {loading ? (
              <div className="d-flex">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={num}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div
                          style={{
                            width: "100%",
                            height: "200px",
                            background: "#e0e0e0",
                          }}
                        ></div>
                      </div>

                      <div className="nft_coll_pp">
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            background: "#e0e0e0",
                          }}
                        ></div>
                      </div>

                      <div
                        className="nft_coll_info"
                        style={{ marginTop: "15px" }}
                      >
                        <div
                          style={{
                            width: "60%",
                            height: "20px",
                            background: "#e0e0e0",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "40%",
                            height: "15px",
                            background: "#e0e0e0",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <OwlCarousel className="owl-theme" {...options}>
                {collections.map((nft) => (
                  <div className="item" key={nft.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${nft.nftId}`}>
                          <img
                            src={nft.nftImage}
                            className="lazy img-fluid"
                            alt={nft.title}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${nft.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={nft.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to={`/item-details/${nft.nftId}`}>
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
      </div>
    </section>
  );
};

export default HotCollections;
