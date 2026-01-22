import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import Skeleton from "../skeleton/Skeleton";
import AuthorImage from "../../images/author_thumbnail.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NewItems() {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // IMAGE LOADING HANDLER
  // ------------------------------
  const handleImageLoad = (index) => {
    setNewItems((prev) => {
      const updated = [...prev];
      updated[index].loaded = true;
      return updated;
    });
  };

  // ------------------------------
  // RESPONSIVE SLIDER LOGIC
  // ------------------------------
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [showArrows, setShowArrows] = useState(true);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;

      if (width < 576) {
        setSlidesToShow(1);
        setShowArrows(false);
      } else if (width < 768) {
        setSlidesToShow(2);
        setShowArrows(false);
      } else if (width < 992) {
        setSlidesToShow(2);
        setShowArrows(true);
      } else if (width < 1200) {
        setSlidesToShow(3);
        setShowArrows(true);
      } else {
        setSlidesToShow(4);
        setShowArrows(true);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const settings = {
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    speed: 200,
    arrows: showArrows,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipe: true,
    swipeToSlide: true,
  };

  // ------------------------------
  // COUNTDOWN CALCULATOR
  // ------------------------------
  const calculateTimeLeft = (expiryDate) => {
    const now = new Date().getTime();
    const distance = expiryDate - now;

    if (distance <= 0) return "Expired";

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // ------------------------------
  // FETCH API DATA (AXIOS INSIDE COMPONENT)
  // ------------------------------
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        const itemsWithState = response.data.map((item) => ({
          ...item,
          loaded: false,
          timeLeft: calculateTimeLeft(item.expiryDate),
        }));

        setNewItems(itemsWithState);
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ------------------------------
  // LIVE COUNTDOWN UPDATER
  // ------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setNewItems((prev) =>
        prev.map((item) => ({
          ...item,
          timeLeft: calculateTimeLeft(item.expiryDate),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ------------------------------
  // RENDER
  // ------------------------------
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          {loading && <p>Loading...</p>}

          {!loading && (
            <div className="slider-wrapper">
              <Slider {...settings}>
                {newItems.map((item, index) => (
                  <div key={index}>
                    <div className="nft_coll">

                      {/* NFT IMAGE + SKELETON */}
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`} state={{ item }}>
                          {!item.loaded && (
                            <Skeleton width="100%" height="200px" />
                          )}

                          <img
                            src={item.nftImage}
                            alt={item.title}
                            onLoad={() => handleImageLoad(index)}
                            style={{
                              display: item.loaded ? "block" : "none",
                              width: "100%",
                              borderRadius: "10px",
                            }}
                          />
                        </Link>
                      </div>

                      {/* AUTHOR IMAGE + SKELETON */}
                      <div className="nft_coll_pp">
                        {!item.loaded ? (
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        ) : (
                         <Link
                              to={`/author/${item.authorId}`}
                              state={{
                                authorId: item.authorId,
                                authorName: item.author,
                                authorImage: item.authorImage,
                                authorUsername: item.authorUsername || "@unknown",
                                authorWallet: item.authorWallet || "No wallet provided",
                                followers: item.followers || "0",
                              }}
                            >
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage || AuthorImage}
                              alt={item.authorId}
                            />
                          </Link>
                        )}
                        {item.loaded && <i className="fa fa-check"></i>}
                      </div>

                      {/* TITLE + CODE + COUNTDOWN */}
                      <div className="nft_coll_info">
                        {!item.loaded ? (
                          <>
                            <Skeleton width="120px" height="20px" />
                            <Skeleton width="80px" height="15px" />
                          </>
                        ) : (
                          <>
                            <Link to={`/item-details/${item.nftId}`} state={{ item }}>
                              <h4>{item.title}</h4>
                            </Link>
                            <span>{item.code || "ERC-721"}</span>
                                  {/* PRICE */}
                            <div className="mt-2">
                              <strong>Price:</strong> {item.price} ETH
                            </div>

                            {/* LIKES */}
                            <div className="mt-1">
                              <i className="fa fa-heart"></i> {item.likes}
                            </div>
                            {/* COUNTDOWN */}
                            <div className="mt-2">
                              <strong>Ends in:</strong> {item.timeLeft}
                            </div>
                          </>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ARROWS ---------------- */

function NextArrow({ onClick, className }) {
  const intervalRef = useRef(null);
  const speedRef = useRef(100);
  const accelerationRef = useRef(null);

  const startScrolling = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(onClick, speedRef.current);

    accelerationRef.current = setInterval(() => {
      speedRef.current = Math.max(50, speedRef.current - 20);
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(onClick, speedRef.current);
    }, 100);
  };

  const stopScrolling = () => {
    clearInterval(intervalRef.current);
    clearInterval(accelerationRef.current);
    intervalRef.current = null;
    accelerationRef.current = null;
    speedRef.current = 300;
  };

  return (
    <div
      className={`${className} shadow-arrow shadow-arrow-right`}
      onClick={onClick}
      onMouseDown={startScrolling}
      onMouseUp={stopScrolling}
      onMouseLeave={stopScrolling}
    />
  );
}

function PrevArrow({ onClick, className }) {
  const intervalRef = useRef(null);
  const speedRef = useRef(100);
  const accelerationRef = useRef(null);

  const startScrolling = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(onClick, speedRef.current);

    accelerationRef.current = setInterval(() => {
      speedRef.current = Math.max(50, speedRef.current - 20);
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(onClick, speedRef.current);
    }, 100);
  };

  const stopScrolling = () => {
    clearInterval(intervalRef.current);
    clearInterval(accelerationRef.current);
    intervalRef.current = null;
    accelerationRef.current = null;
    speedRef.current = 100;
  };

  return (
    <div
      className={`${className} shadow-arrow shadow-arrow-left`}
      onClick={onClick}
      onMouseDown={startScrolling}
      onMouseUp={stopScrolling}
      onMouseLeave={stopScrolling}
    />
  );
}

export default NewItems;