//  https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections
import axios from "axios";
import React, { Component } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const HotCollections = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState();
  async function hotData() {
    setLoading(true);
    const { data } = await axios.get(
      " https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setNfts(data);
    setLoading(false);
  }
  useEffect(() => {
    hotData();
  }, []);


  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      //   {
      //     breakpoint: 1024,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 1,
      //       infinite: true,
      //       dots: true,
      //     },
      //   },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      //   {
      //     breakpoint: 600,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 1,
      //       initialSlide: 2,
      //     },
      //   },
      //   {
      //     breakpoint: 575,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 1,
      //       initialSlide: 2,
      //     },
      //   },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //     },
      //   },
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
          </div>{" "}
          <Slider {...settings}>
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton-box "
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "20px",
                    }}
                  ></div>
                ))
              : nfts.map((nft) => {
                  return (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={nft.id}
                    >
                      <div className="nft_coll" style={{ width: 250 }}>
                        <div
                          className="nft_wrap"
                          style={{ height: 200, marginLeft: 0 }}
                        >
                          <Link to="/item-details">
                            <img
                              style={{ height: 200 }}
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
                  );
                })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
