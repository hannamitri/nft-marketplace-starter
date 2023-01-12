import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function HotCollections() {
  const [loading, setLoading] = useState(true);
  const [hotCollections, setHotCollections] = useState([]);
  const [sliderRef, setSliderRef] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  async function fetchCollections() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setHotCollections(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-in" data-aos-duration="1000">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider__container" data-aos="fade-up" data-aos-duration="1000">
            <button
              className="slider__btn--left slider__btn"
              onClick={sliderRef?.slickPrev}
            >
              <ChevronLeftIcon />
            </button>
            <button
              className="slider__btn--right slider__btn"
              onClick={sliderRef?.slickNext}
            >
              <ChevronRightIcon />
            </button>
            {loading ? (
              <Slider ref={setSliderRef} {...settings}>
                {new Array(6).fill(0).map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={60}
                          height={60}
                        ></Skeleton>
                        <i className="fa fa-check"></i>
                      </div>
                      <div
                        className="nft_coll_info"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          width="35%"
                          style={{ marginBottom: "5px" }}
                        />
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          width="20%"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider ref={setSliderRef} {...settings}>
                {hotCollections.map((item) => (
                  <div key={item.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/:${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/:${item.authorId}`}>
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
                        <span>{`ERC-${item.code}`}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HotCollections;
