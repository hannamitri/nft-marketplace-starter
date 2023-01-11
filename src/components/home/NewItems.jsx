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

const NewItems = () => {
  const [loading, setLoading] = useState(true);
  const [newItems, setNewItems] = useState([]);
  const [sliderRef, setSliderRef] = useState(null);
  const [time, setTime] = useState(new Date());

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  async function loadNewItems() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setNewItems(data);
    setLoading(false);
  }

  useEffect(() => {
    loadNewItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
          <div className="slider__container">
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
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={60}
                          height={60}
                        ></Skeleton>
                        <i className="fa fa-check"></i>
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
                        <Skeleton animation="wave" width="100%" height="100%" />
                      </div>
                      <div className="nft__item_info">
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
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider ref={setSliderRef} {...settings}>
                {newItems.map((item) => (
                  <div key={item.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/:${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate && (
                        <div className="de_countdown">{`${Math.floor(
                          (item.expiryDate - time) / 1000 / 60 / 24
                        )}h ${Math.floor(
                          ((item.expiryDate - time) / 1000 / 60) % 60
                        )}m ${Math.floor(
                          ((item.expiryDate - time) / 1000) % 60
                        )}s`}</div>
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
                        <div className="nft__item_price">{`${item.price} ETH`}</div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
