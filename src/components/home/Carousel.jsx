import React, { Component, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// col-lg-3 col-md-6 col-sm-6 col-xs-12

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#8364e2", borderRadius: "50px"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#8364e2", borderRadius: "50px"}}
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
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollections(data);
      setLoading(false);
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
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Link to={`/${collection.authorId}`}>
                        <div className="skeleton-box" style={stylesImg}></div>
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <div className="skeleton-box" style={stylesPfp}></div>
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <div className="skeleton-box" style={stylesTitle}></div>
                      </Link>
                      <div className="skeleton-box" style={stylesText}></div>
                    </div>
                  </div>
              ))
            : collections.map((collection, index) => (
                  <div className="nft_coll" key = {index}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.authorId}`}>
                        {loading ? (
                          <div className="skeleton-box" style={stylesImg}></div>
                        ) : (
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        )}
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        {loading ? (
                          <div className="skeleton-box" style={stylesPfp}></div>
                        ) : (
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt=""
                          />
                        )}
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        {loading ? (
                          <div
                            className="skeleton-box"
                            style={stylesTitle}
                          ></div>
                        ) : (
                          <h4>{collection.title}</h4>
                        )}
                      </Link>
                      {loading ? (
                        <div className="skeleton-box" style={stylesText}></div>
                      ) : (
                        <span>ERC-{collection.code}</span>
                      )}
                    </div>
                  </div>
              ))}
        </Slider>
      </>
    );
  }
};

export default Carousel;
