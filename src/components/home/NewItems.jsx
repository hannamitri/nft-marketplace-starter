import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-next" onClick={onClick}>
      {">"}
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-prev" onClick={onClick}>
      {"<"}
    </button>
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(Date.now());

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeRemaining = (expiryDate) => {
    const total = new Date(expiryDate) - time;

    if (total <= 0) {
      return "";
    }

    const hours = Math.floor(total / 1000 / 60 / 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) {
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

            {[...Array(4)].map((_, index) => (
              <div className="col-lg-3" key={index}>
                <Skeleton
                  width="100%"
                  height="450px"
                  borderRadius="12px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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

          <div className="col-lg-12">
            <Slider {...settings}>
              {items.map((item) => (
                <div key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.authorName}`}
                      >
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt={item.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {getTimeRemaining(item.expiryDate) && (
                      <div className="de_countdown">
                        {getTimeRemaining(item.expiryDate)}
                      </div>
                    )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>

                          <div className="nft__item_share">
                            <h4>Share</h4>

                            <a href="/" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>

                            <a href="/" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>

                            <a href="/">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.id}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>

                      <div className="nft__item_price">
                        {item.price} ETH
                      </div>

                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
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
