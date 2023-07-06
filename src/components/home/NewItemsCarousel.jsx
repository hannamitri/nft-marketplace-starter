import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CountdownTimer from "./CountdownTimer";
// col-lg-3 col-md-6 col-sm-6 col-xs-12

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#8364e2",
        borderRadius: "50px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#8364e2",
        borderRadius: "50px",
      }}
      onClick={onClick}
    />
  );
}

const Carousel = ({ collections }) => {
  {
    const stylesImg = {
      width: "100%",
      height: "200px",
    };
    const stylesPfp = {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    };
    const stylesTitle = {
      width: "100px",
      height: "20px",
    };

    const stylesText = {
      width: "60px",
      height: "20px",
    };
    const [collections, setCollections] = useState();
    const [loading, setLoading] = useState([]);
    async function fetchPosts(userId) {
      if (!collections) {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setCollections(data);
        setLoading(false);
      }
    }
    fetchPosts();
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <>
        <Slider {...settings}>
          {loading
            ? new Array(6).fill(0).map((collection, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">
                      {/* <CountdownTimer targetTime={collection.expiryDate} /> */}
                      {/* 5h 30m 32s{CountdownTimer(collection.expiryDate)} */}
                    </div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to="/item-details"></Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>Pinky Ocean</h4>
                      </Link>
                      <div className="nft__item_price">3.08 ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>69</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : collections.map((collection, index) => (
                <div className="" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img
                          className="lazy"
                          src={collection.authorImage}
                          alt="authorImage"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {collection.expiryDate != null && (
                      <div className="de_countdown">
                        <CountdownTimer targetTime={collection.expiryDate} />
                      </div>
                    )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to="/item-details">
                        <img
                          src={collection.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>Pinky Ocean</h4>
                      </Link>
                      <div className="nft__item_price">3.08 ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>69</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </Slider>
      </>
    );
  }
};

export default Carousel;
