import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import nftImage from "../../images/nftImage.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", filter: "invert()" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", filter: "invert()" }}
        onClick={onClick}
      />
    );
  }

  const [nftObjects, setNftObjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [countdownTimes, setCountdownTimes] = useState({});

  // Fetching the NFTs data
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNftObjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setLoading(true);
      }
    };

    fetchApi();
  }, []);

  // Countdown logic
  useEffect(() => {
    const initialCountdownTimes = Object.fromEntries(
      Object.values(nftObjects).map((obj) => [obj.id, obj.expiryDate])
    );
    setCountdownTimes(initialCountdownTimes);

    const interval = setInterval(() => {
      setCountdownTimes((prevCountdownTimes) => {
        const updatedCountdownTimes = { ...prevCountdownTimes };
        Object.keys(prevCountdownTimes).forEach((objId) => {
          if (prevCountdownTimes[objId] > 0) {
            updatedCountdownTimes[objId] -= 1000;
          }
        });
        return updatedCountdownTimes;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [nftObjects]);

  const calculateRemainingTime = (countdownTime) => {
    const now = new Date().getTime();
    const distance = countdownTime - now;
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
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
            {loading ? (
              [...Array(4)].map((_, index) => (
                <div className="col-lg-12 col-md-12 col-sm-10 col-xs-12" key={index}>
                  <div className="nft__item"></div>
                  <Skeleton width={"100%"} height={200}></Skeleton>
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <Skeleton width={50} height={50} borderRadius={50}></Skeleton>
                    <i className="fa fa-check"></i>
                  </Link>
                  <div className="nft__item_info"></div>
                  <Link to="/item-details">
                    <Skeleton width={100} height={20}></Skeleton>
                  </Link>
                  <Link to="/item-details">
                    <Skeleton width={60} height={20}></Skeleton>
                  </Link>
                </div>
              ))
            ) : (
              Object.values(nftObjects).map((object) => (
                <div className="col-lg-12 col-md-12 col-sm-10 col-xs-12" key={object.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${object.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img
                          className="lazy"
                          src={object.authorImage || nftImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div>
                      {countdownTimes[object.id] > 0 ? (
                        <div className="de_countdown">
                          {calculateRemainingTime(countdownTimes[object.id]).hours}h{" "}
                          {calculateRemainingTime(countdownTimes[object.id]).minutes}m{" "}
                          {calculateRemainingTime(countdownTimes[object.id]).seconds}s
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

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
                      <Link to={`/item-details/${object.nftId}`}>
                        <img
                          src={object.nftImage || nftImage}
                          className="lazy nft__item_preview"
                          alt={object.nftImage}
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/${object.nftId}`}>
                        <h4>{object.title}</h4>
                      </Link>
                      <div className="nft__item_price">{object.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{object.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;