import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewItems = async () => {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setItems(data);
      setLoading(false);
    };
    fetchNewItems();

    const countDownInterval = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    return () => {
      clearInterval(countDownInterval);
    };
  }, []);
  const updateRemainingTime = () => {
    setItems((previtems) => {
      return previtems.map((item) => {
        if (item.expiryDate) {
          const timeRemaining = item.expiryDate - Date.now() - 3399600

          let secondsEls = timeRemaining / 1000;
          let minutesEls = secondsEls / 60;
          let hoursEls = minutesEls / 60;

          let hoursRemaining = Math.floor(hoursEls);
          let minutesRemaining = Math.floor(minutesEls % 60);
          let secondsRemaining = Math.floor(secondsEls % 60);

          if (hoursRemaining < 0) {
            hoursRemaining = 0;
          }
          if (minutesRemaining < 0) {
            minutesRemaining = 0;
          }
          if (secondsRemaining < 0) {
            secondsRemaining = 0;
          }

          return {
            ...item,
            hoursRemaining,
            minutesRemaining,
            secondsRemaining,
          };
        }
        return item;
      });
    });
  };

  function CustomNextArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-arrow"
        style={{
          ...style,
          position: "absolute",
          top: "45%",
          right: "0px",
          zIndex: "1",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <div
          style={{
            width: "45px",
            border: "1px solid",
            borderColor: "#ccc",
            height: "45px",
            borderRadius: "9999px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "#FFFFFF",
          }}
        >
          <ChevronRightIcon style={{ width: "15px", color: "#000" }} />
        </div>
      </div>
    );
  }

  function CustomPrevArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-arrow"
        style={{
          ...style,
          position: "absolute",
          top: "45%",
          left: "0px",
          zIndex: "1",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <div
          style={{
            width: "45px",
            border: "1px solid",
            borderColor: "#ccc",
            height: "45px",
            borderRadius: "9999px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "#FFFFFF",
          }}
        >
          <ChevronLeftIcon style={{ width: "15px", color: "#000" }} />
        </div>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
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
          {loading ? (
            <Slider {...settings}>
              {new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft__item" style={{ margin: "5px" }}>
                    <div
                      className="author_list_pp skeleton-box"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    >
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <div
                          className="lazy skeleton-box"
                          style={{ width: "20px", height: "10px" }}
                        />
                      </Link>
                    </div>

                    <div
                      className="nft__item_wrap skeleton-box"
                      style={{ width: "100%", height: "350px" }}
                    >
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button></button>
                          <div className="nft__item_share">
                            <h4></h4>
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
                          src="nothing"
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4
                          className="skeleton-box"
                          style={{ width: "180px", height: "30px" }}
                        ></h4>
                      </Link>
                      <div className="nft__item_price"></div>
                      <div
                        className="skeleton-box"
                        style={{ width: "100px", height: "20px" }}
                      ></div>
                      <div className="nft__item_like">
                        <i
                          className="fa fa-heart skeleton-box"
                          style={{
                            width: "30px",
                            height: "15px",
                            marginTop: "30px",
                          }}
                        ></i>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {items.map((item) => (
                <div key={item.id}>
                  <div className="nft__item" style={{ margin: "5px" }}>
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate ? (
                      <div
                        className="de_countdown"
                        style={{ borderColor: "#8364e2" }}
                      >
                        {item.hoursRemaining === 0 &&
                        item.minutesRemaining === 0 &&
                        item.secondsRemaining === 0 ? (
                          <div>EXPIRED</div>
                        ) : (
                          <span>
                            {item.hoursRemaining}h {item.minutesRemaining}m{" "}
                            {item.secondsRemaining}s
                          </span>
                        )}
                      </div>
                    ) : null}
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
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i
                          style={{ cursor: "pointer" }}
                          className="fa fa-heart"
                        ></i>
                        <span>{item.likes}</span>
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
