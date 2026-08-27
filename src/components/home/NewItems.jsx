import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NewItems = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        const data = await response.json();

        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  function getTimeRemaining(expiryDate) {
    const expiryTime = new Date(expiryDate).getTime();

    const difference = expiryTime - currentTime;

    if (difference <= 0) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor(
      (difference % (1000 * 60)) / 1000
    );

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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

          <Slider {...settings}>
  {collections.map((data, index) => {
    const timeRemaining = data.expiryDate
      ? getTimeRemaining(data.expiryDate)
      : null;

    return (
      <div key={index}>
        <div className="nft__item">

          {/* Only shows if expiryDate exists */}
          {timeRemaining && (
            <div className="de_countdown">
              <span className="timer__hours">
                {timeRemaining.hours}
              </span>
              :
              <span className="timer__minutes">
                {timeRemaining.minutes}
              </span>
              :
              <span className="timer__seconds">
                {timeRemaining.seconds}
              </span>
            </div>
          )}

          <div className="nft__item_wrap">
            <Link to={`/item-details/${data.nftId}`}>
              <img
                src={data.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
            </Link>
          </div>

          <div className="nft__item_info">
            <Link to={`/item-details/${data.nftId}`}>
              <h4>{data.title}</h4>
            </Link>

            <div className="nft__item_price">
              {data.price} ETH
            </div>

            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{data.likes}</span>
            </div>
          </div>

        </div>
      </div>
    );
  })}
</Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;