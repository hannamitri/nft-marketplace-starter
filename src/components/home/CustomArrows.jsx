import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./CustomArrows.css";

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

function CustomArrows({ items }) {
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
      {items.map(({ title, authorImage, nftImage }, index) => (
        <div key={index} className="nft_coll">
          <div className="nft_wrap">
            <Link to="/item-details">
              <img src={nftImage} className="lazy img-fluid" alt="" />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/author">
              <img className="lazy pp-coll" src={authorImage} alt="" />
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{title}</h4>
            </Link>
            <span>ERC-192</span>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CustomArrows;
