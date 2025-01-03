import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../home/slider.css";

const HotCollections = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect((data) => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((res) => {
        setRecords(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  }, []);


  

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
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
      <section id="section-collections" className="no-bottom">
        <div className="container slider-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="https://nft-marketplacee.web.app/">
              <Slider {...settings}>
                {loading
                  ? new Array(4).fill(0).map((r, Skeleton) => (
                      <div className="nft_coll ">
                        <div className="nft_wrap" key={Skeleton}>
                          <img
                            src={r.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="nft_coll_pp">
                          <img
                            className="lazy pp-coll"
                            src={r.authorImage}
                            alt=""
                          />

                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <span></span>
                        </div>
                      </div>
                    ))
                  : records.map((r, index) => (
                      <div className="" key={index}>
                        <div className="nft_coll ">
                          <div className="nft_wrap">
                            <Link to={`/item-details/${r.nftId}`}>
                              <img
                                src={r.nftImage}
                                className="lazy img-fluid"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to= {`/author/${r.authorId}`}>
                              <img
                                className="lazy pp-coll"
                                src={r.authorImage}
                                alt=""
                              />
                              
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <Link to="/explore">
                              <h4>{r.title}</h4>
                            </Link>
                            <span>ERC-{r.code}</span>
                          </div>
                        </div>
                      </div>
                    ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HotCollections;
