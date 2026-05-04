import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import Skeleton from "../UI/Skeleton";

import "swiper/css";
import "swiper/css/navigation";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());

  async function fetchNewItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      );
      setNewItems(data);
    } catch (error) {
      console.error("Error fetching new items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function getTimeLeft() {
    const now = Date.now();
  }

  function getTimeLeft(expiryDate) {
    const now = new Date().getTime();
    const expiry = new Date(expiryDate).getTime();
    const difference = expiry - now;

    if (difference <= 0) {
      return "00:00:00";
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1 },
              572: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {newItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <div className="lazy pp-item">
                      
                        <a href="">
                          <img className="" src={item.authorImage} alt="" />
                        </a>
                        <i className="fa fa-check"></i>
                      </div>
                    </Link>
                  </div>

                  <div className="de_countdown">
                   
                    {getTimeLeft(item.expiryDate)}
                  </div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
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

                    <Link to="/item-details">
                      <div className="nft_wrap">
                        <img className="img-fluid" src={item.nftImage} alt="" />
                      </div>
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{item.title}</h4>
                    </Link>

                    <div className="nft__item_price">{item.price}</div>
                  </div>

                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
