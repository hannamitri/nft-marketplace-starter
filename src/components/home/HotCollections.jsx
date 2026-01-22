import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../skeleton/Skeleton";
import AuthorImage from "../../images/author_thumbnail.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HotCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleImageLoad = (index) => {
    setCollections((prev) => {
      const updated = [...prev];
      updated[index].loaded = true;
      return updated;
    });
  };

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

  updateLayout(); // run on mount
  window.addEventListener("resize", updateLayout);

  return () => window.removeEventListener("resize", updateLayout);
}, []);

  const settings = {
  infinite: true,
  slidesToShow,
  slidesToScroll: 1,
  speed: 100,
  arrows: showArrows,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  swipe: true,
  swipeToSlide: true,
};
  
  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        setCollections(
          response.data.map((item) => ({
            ...item,
            loaded: false,
          }))
        );
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          {loading && <p>Loading...</p>}

          {!loading && (
            <div className="slider-wrapper">
              <Slider {...settings}>
                {collections.map((item, index) => (
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
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage || AuthorImage}
                              alt={item.authorId}
                            />
                          </Link>
                        )}
                        {item.loaded && <i className="fa fa-check"></i>}
                      </div>

                      {/* TITLE + CODE + SKELETON */}
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

/* ARROWS (unchanged) */
function NextArrow(props) {
  const { onClick, className } = props;
  const intervalRef = useRef(null);
  const speedRef = useRef(100);
  const accelerationRef = useRef(null);

  const startScrolling = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      onClick();
    }, speedRef.current);

    accelerationRef.current = setInterval(() => {
      speedRef.current = Math.max(50, speedRef.current - 20);
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        onClick();
      }, speedRef.current);
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
      className={className + " shadow-arrow shadow-arrow-right"}
      onClick={onClick}
      onMouseDown={startScrolling}
      onMouseUp={stopScrolling}
      onMouseLeave={stopScrolling}
    />
  );
}

function PrevArrow(props) {
  const { onClick, className } = props;
  const intervalRef = useRef(null);
  const speedRef = useRef(100);
  const accelerationRef = useRef(null);

  const startScrolling = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      onClick();
    }, speedRef.current);

    accelerationRef.current = setInterval(() => {
      speedRef.current = Math.max(50, speedRef.current - 20);
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        onClick();
      }, speedRef.current);
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
      className={className + " shadow-arrow shadow-arrow-left"}
      onClick={onClick}
      onMouseDown={startScrolling}
      onMouseUp={stopScrolling}
      onMouseLeave={stopScrolling}
    />
  );
}

export default HotCollections;