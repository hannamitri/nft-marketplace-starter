import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./HotCollectionsCarousel.css";
import Countdown from "./Countdown";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        border: "1px solid black",
        borderRadius: "50%",
        width: 60,
        height: 60,
        zIndex: 100,
        fontSize: 50,
        color: "black",
      }}
      onClick={onClick}
    >
      &#8250;
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        border: "1px solid black",
        borderRadius: "50%",
        width: 60,
        height: 60,
        zIndex: 100,
        fontSize: 50,
        color: "black",
      }}
      onClick={onClick}
    >
      &#8249;
    </div>
  );
}

function NewItemCarousel({ items }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // <= 1024px wide
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // <= 768px wide (tablet)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // <= 480px wide (phone)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {items.map(({ title, authorImage, nftImage, expiryDate }, index) => (
        <div key={index}>
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Creator: Monica Lucas"
              >
                <img className="lazy" src={authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {expiryDate === null ? (
              " "
            ) : (
              <>
                <div className="de_countdown">
                  <Countdown expiryTime={expiryDate} />
                </div>{" "}
              </>
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
                <img src={nftImage} className="lazy nft__item_preview" alt="" />
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
  );
}

export default NewItemCarousel;
