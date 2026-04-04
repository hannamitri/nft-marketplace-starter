import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import nftImage from "../../images/nftImage.jpg";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function DeCountdown({ endTime }) {
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = endTime - Date.now();

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
        return;
      }

      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div>
      {hours}h {minutes}m {seconds}s
    </div>
  );
}

const NewItems = () => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      "(max-width: 480px)": {
        slides: {
          perView: 1,
          spacing: 8,
        },
      },
    },
  });
  const skeletonStyle = {
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s ease infinite",
    borderRadius: "8px",
  };
  useEffect(() => {
    instanceRef.current?.update();
  }, [items, instanceRef]);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      )
      .then((response) => {
        setItems(response.data.slice(0, 8));
        setLoading(false);
      });
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
          <div style={{ position: "relative" }}>
            <button
              onClick={() => instanceRef.current?.prev()}
              className="arrow arrow-left"
              style={{
                position: "absolute",
                left: "-20px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            >
              <i className="fa fa-angle-left"></i>
            </button>

            <div
              ref={sliderRef}
              className="keen-slider"
              key={loading ? "loading" : "loaded"}
            >
              {loading
                ? Array.from({ length: 4 }, (_, index) => (
                    <div
                      className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <div className="nft_item">
                        <div
                          style={{
                            ...skeletonStyle,
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",
                            margin: "8px auto",
                          }}
                        />
                        <div style={{ ...skeletonStyle, height: "180px" }} />
                        <div
                          style={{
                            ...skeletonStyle,
                            height: "16px",
                            width: "60%",
                            margin: "8px auto",
                          }}
                        />
                      </div>
                    </div>
                  ))
                : items.map((item) => (
                    <div
                      className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={item.id}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to="/author"
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
                        {item.expiryDate && (
                          <div className="de_countdown">
                            <DeCountdown endTime={item.expiryDate} />
                          </div>
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
                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>69</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <button
              onClick={() => instanceRef.current?.next()}
              className="arrow arrow-right"
              style={{
                position: "absolute",
                right: "-20px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            >
              <i className="fa fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
