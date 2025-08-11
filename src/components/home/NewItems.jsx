import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Countdown from "./Countdown"; // Adjust if needed
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const timerRef = useRef(null);

  const [loadingSliderRef] = useKeenSlider({
    loop: false,
    slides: { perView: 4, spacing: 15 },
    breakpoints: {
      "(max-width: 1200px)": { slides: { perView: 3 } },
      "(max-width: 768px)": { slides: { perView: 2 } },
      "(max-width: 480px)": { slides: { perView: 1 } },
    },
  });

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 15 },
    breakpoints: {
      "(max-width: 1200px)": { slides: { perView: 3 } },
      "(max-width: 768px)": { slides: { perView: 2 } },
      "(max-width: 480px)": { slides: { perView: 1 } },
    },
  });

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to fetch new items:", err));
  }, []);

  useEffect(() => {
    if (!instanceRef.current || items.length === 0) return;

    const autoSlide = () => {
      timerRef.current = setTimeout(() => {
        instanceRef.current?.next();
        autoSlide();
      }, 3000);
    };

    instanceRef.current.on("created", autoSlide);
    instanceRef.current.on("destroyed", () =>
      timerRef.current && clearTimeout(timerRef.current)
    );

    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [instanceRef, items]);

  const hoverStyles = {
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container relative">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="relative w-full min-h-[250px]">
            {/* 👈 Left Arrow */}
            <button
              onClick={() => instanceRef.current?.prev()}
              style={{
                position: "absolute",
                top: "50%",
                left: "0",
                transform: "translateY(-50%)",
                background: "white",
                color: "black",
                padding: "0.4rem",
                zIndex: 10,
                borderRadius: "50%",
                ...hoverStyles,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform += " scale(1.15)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(-50%)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <FaChevronLeft size={15} />
            </button>

            {/* 👉 Right Arrow */}
            <button
              onClick={() => instanceRef.current?.next()}
              style={{
                position: "absolute",
                top: "50%",
                right: "0",
                transform: "translateY(-50%)",
                background: "white",
                color: "black",
                padding: "0.5rem",
                zIndex: 10,
                borderRadius: "50%",
                ...hoverStyles,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform += " scale(1.15)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(-50%)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <FaChevronRight size={15} />
            </button>

            {/* 🌀 Slider */}
            <div
              ref={items.length === 0 ? loadingSliderRef : sliderRef}
              className="keen-slider overflow-hidden"
              style={{ position: "relative" }}
            >
              {items.length === 0
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className="keen-slider__slide animate-pulse">
                      <div className="nft__item">
                        <div className="nft__item_wrap bg-gray-300 h-[150px] rounded"></div>
                        <div className="nft__item_info mt-2">
                          <div className="bg-gray-300 h-[20px] w-3/4 mb-1 rounded"></div>
                          <div className="bg-gray-300 h-[16px] w-1/2 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : items.map((item, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <div className="nft__item">
                        {/* Author Link */}
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
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

                        {/* Countdown */}
                        {item.expiryDate && (
                          <Countdown expiryDate={new Date(item.expiryDate).getTime()} />
                        )}

                        {/* Preview */}
                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="#"><i className="fa fa-facebook fa-lg" /></a>
                                <a href="#"><i className="fa fa-twitter fa-lg" /></a>
                                <a href="#"><i className="fa fa-envelope fa-lg" /></a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title}
                            />
                          </Link>
                        </div>

                        {/* Info */}
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
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
