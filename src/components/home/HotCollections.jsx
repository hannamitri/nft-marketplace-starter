import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SkeletonCollection from "./SkeletonCollection";

const NextArrow = ({ onClick }) => {
  const holdTimeout = React.useRef(null);
  const interval = React.useRef(null);
  const wasHeld = React.useRef(false);

  const startHold = () => {
    holdTimeout.current = setTimeout(() => {
      wasHeld.current = true;

      interval.current = setInterval(() => {
        onClick();
      }, 250);
    }, 300);
  };

  const stopHold = () => {
    clearTimeout(holdTimeout.current);
    clearInterval(interval.current);
  };

  const handleClick = () => {
    if (wasHeld.current) {
      wasHeld.current = false;
      return;
    }

    onClick();
  };

  return (
    <div
      className="slick-arrow slick-next"
      onClick={handleClick}
      onPointerDown={startHold}
      onPointerUp={stopHold}
      onPointerLeave={stopHold}
    >
      <i className="fa fa-angle-right"></i>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  const holdTimeout = React.useRef(null);
  const interval = React.useRef(null);
  const wasHeld = React.useRef(false);

  const startHold = () => {
    holdTimeout.current = setTimeout(() => {
      wasHeld.current = true;

      interval.current = setInterval(() => {
        onClick();
      }, 250);
    }, 300);
  };

  const stopHold = () => {
    clearTimeout(holdTimeout.current);
    clearInterval(interval.current);
  };

  const handleClick = () => {
    if (wasHeld.current) {
      wasHeld.current = false;
      return;
    }

    onClick();
  };

  return (
    <div
      className="slick-arrow slick-prev"
      onClick={handleClick}
      onPointerDown={startHold}
      onPointerUp={stopHold}
      onPointerLeave={stopHold}
    >
      <i className="fa fa-angle-left"></i>
    </div>
  );
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    )
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) =>
        console.error("Error fetching collections:", err)
      );
  }, []);

  const settings = {
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    swipeToSlide: true,
    touchMove: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {collections.length === 0 ? (
          <div className="row">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="col-lg-3 col-md-6 col-sm-6">
                <SkeletonCollection />
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            <Slider {...settings}>
              {collections.map((item) => (
                <div key={item.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt={item.title}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>{item.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotCollections;























