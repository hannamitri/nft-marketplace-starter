import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/home css/newItems.css";
import "../../css/home css/newItems.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const response = await axios(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );

    setNewItems(response.data);
    console.log(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const PrevArrow = ({ onClick }) => (
    <button className="slick-prev custom-prev" onClick={onClick}>
      <path d="M15 4L7 12L15 20" />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button className="slick-next custom-next" onClick={onClick}>
      <path d="M9 4L17 12L9 20" />
    </button>
  );

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1190,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 763,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
              <h2
                data-aos="fade-in"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
              >
                New Items
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="carousel-container">
            <Slider {...settings}>
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div className="new__items--loading">
                      <div className="new__items-loading-author-wrapper">
                        <div className="new__items-loading-author"></div>
                      </div>
                      <div className="new__items-loading-author-text-wrapper">
                        <div className="new__items-loading-author-text"></div>
                        <div className="new__items-loading-author-mini-text-wrapper">
                          <div className="new__items-loading-author-mini-text"></div>
                          <div className="new__items-loading-likes"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : newItems.map((response, index) => (
                    <div className="response__wrapper" key={index}>
                      <div
                        // className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                        className="new__items--wrapper"
                        key={index}
                      >
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <Link
                              to={`/author/${response.authorId}`}
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Creator: Monica Lucas"
                            >
                              <img
                                data-aos="fade-in"
                                data-aos-offset="200"
                                data-aos-delay="50"
                                data-aos-duration="1000"
                                data-aos-easing="ease-in-out"
                                data-aos-mirror="true"
                                data-aos-once="true"
                                className="lazy"
                                src={response.authorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>

                          <div className="nft__item_wrap">
                            <div className="nft__item_extra">
                              <div className="nft__item_buttons">
                                <button
                                  data-aos="fade-in"
                                  data-aos-offset="200"
                                  data-aos-delay="50"
                                  data-aos-duration="1000"
                                  data-aos-easing="ease-in-out"
                                  data-aos-mirror="true"
                                  data-aos-once="true"
                                >
                                  Buy Now
                                </button>
                                <div className="nft__item_share">
                                  <h4
                                    data-aos="fade-in"
                                    data-aos-offset="200"
                                    data-aos-delay="50"
                                    data-aos-duration="1000"
                                    data-aos-easing="ease-in-out"
                                    data-aos-mirror="true"
                                    data-aos-once="true"
                                  >
                                    Share
                                  </h4>
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

                            <Link to={`/item-details/${response.nftId}`}>
                              <img
                                src={response.nftImage}
                                className="lazy nft__item_preview"
                                alt=""
                                data-aos="fade-in"
                                data-aos-offset="200"
                                data-aos-delay="50"
                                data-aos-duration="1000"
                                data-aos-easing="ease-in-out"
                                data-aos-mirror="true"
                                data-aos-once="true"
                              />
                            </Link>
                          </div>
                          <div className="nft__item_info">
                            <Link to={`/item-details/${response.nftId}`}>
                              <h4
                                data-aos="fade-in"
                                data-aos-offset="200"
                                data-aos-delay="50"
                                data-aos-duration="1000"
                                data-aos-easing="ease-in-out"
                                data-aos-mirror="true"
                                data-aos-once="true"
                              >
                                {response.title}
                              </h4>
                            </Link>
                            <div
                              className="nft__item_price"
                              data-aos="fade-in"
                              data-aos-offset="200"
                              data-aos-delay="50"
                              data-aos-duration="1000"
                              data-aos-easing="ease-in-out"
                              data-aos-mirror="true"
                              data-aos-once="true"
                            >
                              {response.price} ETH
                            </div>
                            <div className="nft__item_like">
                              <i className="fa fa-heart"></i>
                              <span
                                data-aos="fade-in"
                                data-aos-offset="200"
                                data-aos-delay="50"
                                data-aos-duration="1000"
                                data-aos-easing="ease-in-out"
                                data-aos-mirror="true"
                                data-aos-once="true"
                              >
                                {" "}
                                {response.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
