import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";
import "css/styles/slick-fixes.css";

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev" onClick={onClick}>
    <FaChevronLeft />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next" onClick={onClick}>
    <FaChevronRight />
  </div>
);

const Countdown = ({ expiry }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Add null check inside useEffect to follow React Hooks rules
    if (!expiry) {
      setTimeLeft("");
      return;
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = new Date(expiry).getTime() - now;

      if (distance < 0) return setTimeLeft("Expired");

      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, [expiry]);

  // Don't render anything if no expiry
  if (!expiry) return null;

  return <div className="de_countdown">{timeLeft}</div>;
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching new items:", err));
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <Slider {...sliderSettings}>
            {(loading ? new Array(4).fill(null) : items).map((item, index) => (
              <div className="slick-slide-item" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="/author">
                      {item ? (
                        <img className="lazy" src={item.authorImage} alt="" />
                      ) : (
                        <Skeleton circle height={50} width={50} />
                      )}
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  {loading ? (
                    <Skeleton width={100} height={20} />
                  ) : (
                    <Countdown expiry={item?.expiryDate} />
                  )}

                  <div className="nft__item_wrap">
                    <Link to={`/item-details/new/${index}`}>
                      {item ? (
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      ) : (
                        <Skeleton height={200} />
                      )}
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${index}`}>
                      <h4>{item?.title || <Skeleton width={100} />}</h4>
                    </Link>
                    <div className="nft__item_price">
                      {item?.price ? `${item.price} ETH` : <Skeleton width={60} />}
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item?.likes || <Skeleton width={20} />}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
