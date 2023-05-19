import React, { useEffect, useState, Component } from "react";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function main() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotCollections(data);
      setLoading(false);
    }
    setTimeout(() => {
      main();
    }, 1500);
  }, []);

  class SimpleSlider extends Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,

        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1035,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
      return (
        <div>
          <Slider {...settings}>
            {!loading
              ? hotCollections.map((hot, index) => {
                  return (
                    <div key={index}>
                      <div
                        style={{
                          width: "325px",
                          paddingRight: "12px",
                          paddingLeft: "12px",
                          maxWidth: "initial",
                          margin: "0 auto",
                        }}
                        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      >
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Link to="/item-details">
                              <img
                                src={hot.nftImage}
                                className="lazy img-fluid"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to="/author">
                              <img
                                className="lazy pp-coll"
                                src={hot.authorImage}
                                alt=""
                              />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <Link to="/explore">
                              <h4>{hot.title}</h4>
                            </Link>
                            <span>ERC-{hot.code}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : new Array(6).fill(0).map((_, index) => {
                  return (
                    <div key={index}>
                      <div
                        style={{
                          width: "325px",
                          paddingRight: "12px",
                          paddingLeft: "12px",
                          maxWidth: "initial",
                          margin: "0 auto",
                        }}
                        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      >
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <div
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                width: "100%",
                                height: "80%",
                              }}
                              
                            ></div>
                          </div>
                          <div style={{ paddingBottom: "10px" }}>
                            <div className="nft_coll_pp">
                              <div
                                style={{
                                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                                  width: "60px",
                                  height: "60px",
                                  borderRadius: "100%",
                                }}
                                
                              ></div>
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="nft_coll_info">
                              <h4
                                style={{
                                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                                  width: "50%",
                                  margin: "0 auto",
                                  borderRadius: "4px",
                                  marginBottom: "10px",
                                  height: "10px",
                                }}
                              ></h4>
                              <h4
                                style={{
                                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                                  width: "30%",
                                  margin: "0 auto",
                                  borderRadius: "4px",
                                  height: "10px",
                                }}
                              ></h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </Slider>
        </div>
      );
    }
  }

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
          <SimpleSlider />
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
