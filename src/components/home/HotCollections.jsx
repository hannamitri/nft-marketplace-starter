import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = ({ data, setData, loading}) => {
  

  function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", borderRadius: "50%", }}
      onClick={onClick}
    />
  );
}

  function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", borderRadius: "50%", }}
      onClick={onClick}
    />
  );
}

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    waitforAnimate: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
  };
  console.log(data)
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 flex items-center justify-center mb-4">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!loading ? (
            <Slider
              {...settings}
              arrows={true}
              className="hot-collections-slider"
            >
              {data.map((item, index) => (
                <div className="hot-collections-slide" key={item.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-lg-12 mb-4 skeleton-row">
                  <Skeleton
                    skeleton-box
                    width="350px"
                    height="300px"
                    borderRadius="5px"
                  />
                  <Skeleton
                    skeleton-box
                    width="350px"
                    height="300px"
                    borderRadius="5px"
                  />
                  <Skeleton
                    skeleton-box
                    width="350px"
                    height="300px"
                    borderRadius="5px"
                  />
                </div>
                <div className="flex items-center justify-center"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
