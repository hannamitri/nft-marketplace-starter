import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

// Custom Left Arrow Component
const PrevArrow = ({ onClick }) => (
  <button
    className="slick-arrow slick-prev custom-arrow"
    onClick={onClick}
    aria-label="Previous"
  >
    <i className="fa fa-chevron-left"></i>
  </button>
);

// Custom Right Arrow Component
const NextArrow = ({ onClick }) => (
  <button
    className="slick-arrow slick-next custom-arrow"
    onClick={onClick}
    aria-label="Next"
  >
    <i className="fa fa-chevron-right"></i>
  </button>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  // Carousel Configuration
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Mobile screen
        settings: {
          slidesToShow: 1, // Single card view
        },
      },
    ],
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
              /* SKELETON LOADING STATE */
              <div className="row">
                {new Array(4).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  >
                    <div className="nft_coll">
                      <div
                        className="nft_wrap skeleton-box"
                        style={{
                          height: "200px",
                          backgroundColor: "#e0e0e0",
                          borderRadius: "8px",
                        }}
                      ></div>
                      <div className="nft_coll_pp">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundColor: "#e0e0e0",
                            margin: "0 auto",
                          }}
                        ></div>
                      </div>
                      <div
                        className="nft_coll_info text-center mt-3"
                        style={{ padding: "10px" }}
                      >
                        <div
                          className="skeleton-box mb-2"
                          style={{
                            height: "18px",
                            width: "60%",
                            backgroundColor: "#e0e0e0",
                            margin: "0 auto",
                          }}
                        ></div>
                        <div
                          className="skeleton-box"
                          style={{
                            height: "14px",
                            width: "40%",
                            backgroundColor: "#e0e0e0",
                            margin: "0 auto",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* LIVE CAROUSEL DATA */
              <Slider {...settings}>
                {collections.map((collection) => (
                  <div key={collection.id} className="px-2">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link
                          to={`/item-details/${
                            collection.nftId || collection.id
                          }`}
                        >
                          <img
                            src={collection.nftImage || nftImage}
                            className="lazy img-fluid"
                            alt={collection.title || "NFT"}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage || AuthorImage}
                            alt="Author"
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link
                          to={`/item-details/${
                            collection.nftId || collection.id
                          }`}
                        >
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
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
