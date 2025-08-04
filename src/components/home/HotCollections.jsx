import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    margin: 10,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  async function getCollections() {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getCollections();
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
          <div className="">
            {loading ? (
              <Slider {...settings}>
                {[...Array(6)].map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100%",
                          height: "200px",
                          backgroundColor: "#dddbdd",
                        }}
                      ></div>
                    </div>
                    <div className="nft_coll_pp">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          backgroundColor: "#dddbdd",
                        }}
                      ></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info" style={{ padding: "0" }}>
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100px",
                          height: "20px",
                          backgroundColor: "#dddbdd",
                        }}
                      ></div>
                    </div>
                    <div
                      className="skeleton-box"
                      style={{
                        width: "60px",
                        height: "20px",
                        backgroundColor: "#dddbdd",
                        display: "inline-block",
                      }}
                    ></div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...settings}>
                {collections.map((collection, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <div className="link__navigate"
                        onClick={() => {
                          navigate(`/item-details/${collection.nftId}`);
                        }}
                      >
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="nft_coll_pp">
                      <div className="link__navigate"
                        onClick={() => {
                          navigate(`/author/${collection.authorId}`);
                        }}
                      >
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
