import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import SkeletonCard from "../UI/SkeletonCard";

const NewItems = ({ nftData }) => {
  const [localNftData, setLocalNftData] = useState([]);

  const [timeLeft, setTimeLeft] = useState(5 * 60 * 60 + 30 * 60 + 32);


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localNftData && localNftData.length > 0) {
      setIsLoading(false);
    }
  }, [localNftData]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        setLocalNftData(response.data);
      } catch (error) {
        console.error("There was an error fetching the NFT data!", error);
      }
    };

    fetchNFTs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);

          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);

  const minutes = Math.floor((timeLeft % 3600) / 60);

  const seconds = timeLeft % 60;

  const Arrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{
          ...style,

          display: "block",

          background: "#ccc",

          borderRadius: "50px",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,

    infinite: true,

    speed: 500,

    slidesToShow: 4,

    slidesToScroll: 1,

    nextArrow: <Arrow />,

    prevArrow: <Arrow />,

    initialSlide: 0,

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
        breakpoint: 430,

        settings: {
          slidesToShow: 1,

          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>

              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {isLoading ? (
            <div className="row">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : (
            <Slider {...settings}>
              {localNftData.length > 0 &&
                localNftData.map((nft, index) => (
                  <div key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={nft.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <div className="de_countdown">
                        {hours}h {minutes}m {seconds}s
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

                        <Link to={`/item-details/${nft.id}`}>
                          <img
                            src={nft.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{nft.title}</h4>
                        </Link>

                        <div className="nft__item_price">
                          {`${nft.price}`} ETH
                        </div>

                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>

                          <span>{nft.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
