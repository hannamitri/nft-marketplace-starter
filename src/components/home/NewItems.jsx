import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

const NewItems = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);



const getTimeRemaining = (expiryDate) => {
  const total = new Date(expiryDate) - new Date();

  if (total <= 0) {
    return "Expired";
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

  return `${hours}h ${minutes}m ${seconds}s`;
};


 
  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((response) => {
        setTimeout(() => {
          setCollections(response.data);
          setLoading(false);
        }, 2000); //
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);


  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    renderMode: "performance",

    slides: {
      perView: 4,
      spacing: 0,
    },

    breakpoints: {
      "(max-width: 992px)": {
        slides: { perView: 3 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2 },
      },
      "(max-width: 576px)": {
        slides: { perView: 1 },
      },
    },
  });

const [time, setTime] = useState(Date.now());

useEffect(() => {
  const interval = setInterval(() => {
    setTime(Date.now()); // forces re-render
  }, 1000);

  return () => clearInterval(interval);
}, []);


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">

          {/* Title */}
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          {/* Slider wrapper */}
          <div style={{ position: "relative" }}>

            
            <div
              ref={sliderRef}
              className="keen-slider"
              key={loading ? "loading" : "loaded"}
            >

              
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                      key={index}
                    >
                      <div className="nft__item">
                        <div className="nft__item_wrap skeleton-box"></div>

                        <div className="nft__item_info">
                          <div className="skeleton-text"></div>
                          <div className="skeleton-text small"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : collections.slice(0, 6).map((item, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                      key={index}
                    >
                      <div className="nft__item">

                        {/* Author */}
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy"
                              src={item.authorImage || AuthorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="de_countdown">
                            {getTimeRemaining(item.expiryDate)}
                          </div>

                        {/* Image */}
                        <div className="nft__item_wrap">
                          <Link
                            to={`/item-details/${item.nftId}`}
                            state={item}
                          >
                            <img
                              src={item.nftImage || nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>

                        {/* Info */}
                        <div className="nft__item_info">
                          <Link
                            to={`/item-details/${item.nftId}`}
                            state={item}
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

            <button
              className="button owl-prev"
              onClick={() => instanceRef.current?.prev()}
            >
              <FontAwesomeIcon icon={faCircleChevronLeft} />
            </button>

            <button
              className="button owl-next"
              onClick={() => instanceRef.current?.next()}
            >
              <FontAwesomeIcon icon={faCircleChevronRight} />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
