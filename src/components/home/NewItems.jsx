import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";
import Skeleton from "../UI/Skeleton";
import NftItem from "../UI/NftItem";

// Custom arrow components
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="hot-collections-arrow hot-collections-arrow-next"
      onClick={onClick}
    >
      <i className="fa fa-chevron-right"></i>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="hot-collections-arrow hot-collections-arrow-prev"
      onClick={onClick}
    >
      <i className="fa fa-chevron-left"></i>
    </div>
  );
};

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      newItems.forEach((item) => {
        const now = Date.now();
        const timeLeft = item.expiryDate - now;

        if (timeLeft > 0) {
          const hours = Math.floor(timeLeft / (1000 * 60 * 60));
          const minutes = Math.floor(
            (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          newCountdowns[item.nftId] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newCountdowns[item.nftId] = "Expired";
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [newItems]);

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
              {loading
                ? new Array(8).fill(0).map((_, index) => (
                    <div key={index}>
                      <div className="nft__item" style={{ margin: "0 10px" }}>
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </div>
                        <div className="de_countdown">
                          <Skeleton
                            width="80px"
                            height="20px"
                            borderRadius="4px"
                          />
                        </div>
                        <div className="nft__item_wrap">
                          <Skeleton
                            width="100%"
                            height="250px"
                            borderRadius="8px"
                          />
                        </div>
                        <div className="nft__item_info">
                          <Skeleton
                            width="120px"
                            height="20px"
                            borderRadius="4px"
                          />
                          <Skeleton
                            width="80px"
                            height="16px"
                            borderRadius="4px"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : newItems.map((item) => (
                    <div key={item.nftId}>
                      <div style={{ margin: "0 10px" }}>
                        <NftItem
                          item={item}
                          countdown={countdowns[item.nftId]}
                        />
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
