import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import SampleNextArrow from "../UI/SampleNextArrow";
import SamplePrevArrow from "../UI/SamplePrevArrow";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [data, setData] = useState([]);

  const sliderSettings = {
    infinite: true,
    speed: 250,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          speed: 250,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          speed: 250,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          speed: 250,
        },
      },
    ],
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setData(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error Response: " + error.response.data);
      } else if (error.request) {
        console.error("Error Request: " + error.request);
      } else {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateTimer = (expiryDate) => {
    const currentTime = Date.now();
    const timeLeft = expiryDate - currentTime;

    if (timeLeft <= 0) {
      return { expired: "Expired" };
    }

    const sec = Math.floor(timeLeft / 1000) % 60;
    const min = Math.floor(timeLeft / (1000 * 60)) % 60;
    const hrs = Math.floor(timeLeft / (1000 * 60 * 60));

    return { sec, min, hrs, expiryDate };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          timer: calculateTimer(item.expiryDate),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

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

          <Slider {...sliderSettings}>
            {data.length > 0 ? (
              data.map((item) => {
                const timeLeft = item.timer || calculateTimer(item.expiryDate);

                return (
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                    key={item.id}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator of: ${item.title} NFT`}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
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

                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft__item_wrap">
                      <a href="/">
                        <Skeleton width="100%" height="350px" />
                      </a>
                    </div>

                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>
                          <Skeleton width="100%" height="20px" />
                        </h4>
                      </Link>
                      <div className="nft__item_price">
                        <Skeleton width="60%" height="20px" />
                      </div>
                      <div className="nft__item_like">
                        <Skeleton width="30px" height="20px" />
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;