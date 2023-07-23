import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, Setloading] = useState(true);
  const displaycount = Array(4).fill(null);
  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const fetchData = response.data;
        setFetchedData(fetchData);
        Setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        Setloading(false);
      }
    }
    fetchCollections();
  }, []);

  const PrevArrow = ({ className, style, onClick }) => {
    return (
      <button
        className={className}
        style={{ ...style, display: "flex" }}
        onClick={onClick}
      >
        Previous
      </button>
    );
  };
  const NextArrow = ({ className, style, onClick }) => {
    return (
      <button
        className={className}
        onClick={onClick}
        style={{ ...style, display: "flex" }}
      >
        Next
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="carousel-container">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
              {loading && (
                <>
                  <Slider {...settings}>
                    {displaycount.map((_, index) => (
                      <div key={index}>
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Skeleton width={282} height={270} />
                          </div>
                          <div className="nft_coll_pp">
                            <Skeleton
                              width={50}
                              height={50}
                              borderRadius={99}
                            />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <h4>
                              <Skeleton height={20} width="40%" />
                            </h4>
                            <span>
                              <Skeleton height={20} width="20%" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </>
              )}

              <Slider {...settings}>
                {fetchedData.map((nft, index) => (
                  <div loop margin={10} key={index} nav>
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
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
