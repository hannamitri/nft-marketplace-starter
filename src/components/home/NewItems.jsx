import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const sliderRef = useRef(null);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (expiryDate) => {
    // If no expiry date, return null to hide the countdown
    if (!expiryDate) return null;

    const expiry = new Date(expiryDate).getTime();
    const timeDifference = expiry - currentTime;

    // If expired, return "Expired"
    if (timeDifference <= 0) {
      return "Expired";
    }

    // Fixed math calculations using modulo operator
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Format display based on time remaining
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="custom-carousel-container">
              {loading ? (
                <Slider ref={sliderRef} {...settings}>
                  {new Array(8).fill(0).map((_, index) => (
                    <div key={index} className="px-2">
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </div>
                        <div className="de_countdown">
                          <Skeleton
                            width="80px"
                            height="20px"
                            borderRadius="4px"
                          />
                        </div>
                        <div className="nft__item_wrap">
                          <Skeleton
                            width="100%"
                            height="200px"
                            borderRadius="8px"
                          />
                        </div>
                        <div className="nft__item_info">
                          <Skeleton
                            width="80%"
                            height="24px"
                            borderRadius="4px"
                          />
                          <div style={{ marginTop: "8px" }}>
                            <Skeleton
                              width="60%"
                              height="20px"
                              borderRadius="4px"
                            />
                          </div>
                          <div style={{ marginTop: "8px" }}>
                            <Skeleton
                              width="40px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <Slider ref={sliderRef} {...settings}>
                  {newItems.map((item, index) => (
                    <div key={item.id || index} className="px-2">
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId || item.id}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Creator: ${item.authorName || "Unknown"}`}
                          >
                            <img
                              className="lazy"
                              src={item.authorImage || AuthorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {/* Conditionally render countdown only if there's a valid countdown */}
                        {formatCountdown(item.expiryDate) && (
                          <div className="de_countdown">
                            {formatCountdown(item.expiryDate)}
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

                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage || nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
              <div className="owl-nav">
                <div className="owl-prev" onClick={goToPrev}>
                  <i className="fa fa-angle-left"></i>
                </div>
                <div className="owl-next" onClick={goToNext}>
                  <i className="fa fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
