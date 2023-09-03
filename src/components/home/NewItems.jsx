import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [nftArray, setNftArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNftArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(nftArray);

  // This useEffect hook will run whenever the nftArray or its items change
  useEffect(() => {
    // Define the function to update countdowns
    const updateCountdowns = () => {
      // Map over the nftArray and calculate countdowns for items with expiryDates
      const updatedNftArray = nftArray.map((nft) => {
        if (nft.expiryDate) {
          // Calculate the remaining time in milliseconds
          const remainingTime = new Date(nft.expiryDate) - Date.now();

          // If the remaining time is non-negative (item not expired)
          if (remainingTime <= 0) {
            // Set countdown to "00:00:00" when the item expires
            return { ...nft, countdown: "00:00:00" };
          }

          // Calculate hours, minutes, and seconds
          const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
          const seconds = Math.floor((remainingTime / 1000) % 60);

          // Format the time as HH:MM:SS
          const formattedTime = `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
          }:${seconds < 10 ? `0${seconds}` : seconds}`;

          // Return the item with the updated countdown
          return { ...nft, countdown: formattedTime };
        }
        // For items without expiryDate, return them as is
        return nft;
      });

      // Update the state with the updatedNftArray
      setNftArray(updatedNftArray);
    };

    // Set up an interval to call updateCountdowns every second
    const interval = setInterval(updateCountdowns, 1000);

    // Clear the interval when the component unmounts or when nftArray changes
    return () => clearInterval(interval);
  }, [nftArray]);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  var carouselSettings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
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
          <Slider {...carouselSettings}>
            {nftArray.length > 0
              ? nftArray.map((nft) => (
                  <div className="carousel-slide" key={nft.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${nft.authorName}`}
                        >
                          <img className="lazy" src={nft.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {nft.expiryDate && (
                        <div className="de_countdown">{nft.countdown}</div>
                      )}

                      <div className="nft__item_wrap">
                        <Link to="/item-details">
                          <img
                            src={nft.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{nft.title}</h4>
                        </Link>
                        <div className="nft__item_price">{`${nft.price} ETH`}</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{nft.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : Array.from({ length: 5 }).map((_, index) => (
                  <div className="carousel-slide" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton
                          width={"60px"}
                          height={"60px"}
                          borderRadius={"25px"}
                        >
                          <div>&nbsp;</div>
                        </Skeleton>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft__item_wrap">
                        {/* <Link to="/item-details"> */}
                        <Skeleton width={"100%"} height={"100%"}>
                          <div>&nbsp;</div>
                        </Skeleton>
                        {/* </Link> */}
                      </div>
                      <div className="">
                        <Skeleton
                          width={"120px"}
                          height={"19.19px"}
                          marginTop={"8px"}
                        >
                          <div>&nbsp;</div>
                        </Skeleton>
                      </div>
                      <Skeleton width={"90px"} height={"19.19px"}>
                        <div>&nbsp;</div>
                      </Skeleton>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
