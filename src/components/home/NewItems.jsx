import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Countdown = ({ expiryDate }) => {
  const getTimeLeft = () => new Date(expiryDate).getTime() - Date.now();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  if (timeLeft <= 0) {
    return <div className="de_countdown">Expired</div>;
  }

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="de_countdown">
      {days > 0 && `${days}d `}
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

const SkeletonCard = () => (
  <div className="keen-slider__slide">
    <div className="nft__item">
      <div className="author_list_pp">
        <span
          className="skeleton-box"
          style={{ width: 50, height: 50, borderRadius: "100%" }}
        ></span>
      </div>

      <span
        className="skeleton-box"
        style={{ width: 70, height: 16, marginBottom: 10 }}
      ></span>

      <div className="nft__item_wrap">
        <span
          className="skeleton-box"
          style={{ width: "100%", height: 350, borderRadius: 8 }}
        ></span>
      </div>

      <div className="nft__item_info">
        <span
          className="skeleton-box"
          style={{ width: "70%", height: 18, marginBottom: 10 }}
        ></span>
        <span
          className="skeleton-box"
          style={{ width: "40%", height: 14, marginBottom: 10 }}
        ></span>
        <span
          className="skeleton-box"
          style={{ width: "25%", height: 14 }}
        ></span>
      </div>
    </div>
  </div>
);

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 1199px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(max-width: 991px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(max-width: 575px)": {
        slides: { perView: 1, spacing: 15 },
      },
    },
  });

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      )
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      instanceRef.current?.update();
    }
  }, [items, loading, instanceRef]);

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
            <div className="keen-slider-wrapper" style={{ position: "relative" }}>
              <div ref={sliderRef} className="keen-slider">
                {loading
                  ? Array.from({ length: 8 }).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))
                  : items.map((item) => (
                      <div className="keen-slider__slide" key={item.id}>
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <Link
                              to={`/author/${item.authorId}`}
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Creator: Monica Lucas"
                            >
                              <img
                                className="lazy"
                                src={item.authorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <Countdown expiryDate={item.expiryDate} />

                          <div className="nft__item_wrap">
                            <div className="nft__item_extra">
                              <div className="nft__item_buttons">
                                <button>Buy Now</button>
                                <div className="nft__item_share">
                                  <h4>Share</h4>
                                  <a href="#" onClick={(e) => e.preventDefault()} target="_blank" rel="noreferrer">
                                    <i className="fa fa-facebook fa-lg"></i>
                                  </a>
                                  <a href="#" onClick={(e) => e.preventDefault()} target="_blank" rel="noreferrer">
                                    <i className="fa fa-twitter fa-lg"></i>
                                  </a>
                                  <a href="#" onClick={(e) => e.preventDefault()}>
                                    <i className="fa fa-envelope fa-lg"></i>
                                  </a>
                                </div>
                              </div>
                            </div>

                            <Link
                              to={`/item-details/${item.nftId}`}
                              state={{ item }}
                            >
                              <img
                                src={item.nftImage}
                                className="lazy nft__item_preview"
                                alt={item.title}
                              />
                            </Link>
                          </div>
                          <div className="nft__item_info">
                            <Link
                              to={`/item-details/${item.nftId}`}
                              state={{ item }}
                            >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;