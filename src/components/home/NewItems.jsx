import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Countdown Timer Component
const CountdownTimer = ({ expiry }) => {
  const calculateTimeLeft = () => {
    const difference = expiry - Date.now();
    return difference > 0
      ? {
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / (1000 * 60)) % 60),
          s: Math.floor((difference / 1000) % 60),
        }
      : { h: 0, m: 0, s: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [expiry]);

  if (timeLeft.h === 0 && timeLeft.m === 0 && timeLeft.s === 0) {
    return null
  }

  return (
    <div className="de_countdown">
      {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
    </div>
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(data);
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewItems();
  }, []);

  const NextArrow = ({ className, style, onClick }) => (
    <div
      className={`${className} custom-slick-arrow right-[-20px]`}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        zIndex: 2,
      }}
      onClick={onClick}
    >
      <i className="fa fa-chevron-right text-white text-lg" />
    </div>
  );

  const PrevArrow = ({ className, style, onClick }) => (
    <div
      className={`${className} custom-slick-arrow left-[-20px]`}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        zIndex: 2,
      }}
      onClick={onClick}
    >
      <i className="fa fa-chevron-left text-white text-lg" />
    </div>
  );


  const sliderSettings = {
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const renderSkeletons = () => {
    return Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="nft__item animate-pulse m-3">
        <div className="author_list_pp bg-gray-300 h-12 w-12 rounded-full mb-2" />
        <div className="de_countdown bg-gray-300 h-4 w-1/2 mb-2 rounded" />
        <div className="nft__item_wrap bg-gray-300 h-48 w-full mb-2 rounded" />
        <div className="nft__item_info">
          <div className="bg-gray-300 h-4 w-3/4 mb-1 rounded" />
          <div className="bg-gray-300 h-4 w-1/2 mb-1 rounded" />
          <div className="bg-gray-300 h-4 w-1/3 rounded" />
        </div>
      </div>
    ));
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="text-center mb-4">
          <h2>New Items</h2>
          <div className="small-border bg-color-2"></div>
        </div>
        {loading ? (
          <div className="flex gap-4 justify-center">{renderSkeletons()}</div>
        ) : (
          <Slider {...sliderSettings}>
            {items.map((item, index) => (
              <div className="nft__item m-3" key={index}>
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`} title={`Creator: ${item.author}`}>
                    <img className="lazy" src={item.authorImage} alt={item.author} />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <CountdownTimer expiry={item.expiryDate} />

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="#"><i className="fa fa-facebook fa-lg"></i></a>
                        <a href="#"><i className="fa fa-twitter fa-lg"></i></a>
                        <a href="#"><i className="fa fa-envelope fa-lg"></i></a>
                      </div>
                    </div>
                  </div>
                  <Link to={`item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
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
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default NewItems;
