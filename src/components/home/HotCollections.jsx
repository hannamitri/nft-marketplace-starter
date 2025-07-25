import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
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
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => setHotCollections(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    if (!instanceRef.current || hotCollections.length === 0) return;

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
  }, [instanceRef, hotCollections]);

  const hoverStyles = {
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container relative">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
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
              ref={hotCollections.length === 0 ? loadingSliderRef : sliderRef}
              className="keen-slider overflow-hidden"
              style={{ position: "relative" }}
            >
              {hotCollections.length === 0
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className="keen-slider__slide animate-pulse">
                      <div className="nft_coll">
                        <div className="nft_wrap bg-gray-300 h-[150px] rounded"></div>
                        <div className="nft_coll_pp mt-2 flex items-center">
                          <div className="bg-gray-300 rounded-full h-[40px] w-[40px] mr-2"></div>
                          <div className="bg-gray-300 h-[16px] w-[16px] rounded"></div>
                        </div>
                        <div className="nft_coll_info mt-2">
                          <div className="bg-gray-300 h-[20px] w-3/4 mb-1 rounded"></div>
                          <div className="bg-gray-300 h-[16px] w-1/2 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : hotCollections.map((collection, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${collection.nftId}`}>
                            <img
                              src={collection.nftImage}
                              className="lazy img-fluid"
                              alt={collection.title}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${collection.authorId}`}>

                            <img
                              className="lazy pp-coll"
                              src={collection.authorImage}
                              alt={collection.seller}
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to={`/author/${collection.authorId}`}>
                            <h4>{collection.title}</h4>
                          </Link>
                          <span>{collection.code}</span>
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

export default HotCollections;
