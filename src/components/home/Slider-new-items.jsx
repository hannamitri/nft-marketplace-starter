import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton.jsx";


const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const calculateTime = () => {
      const difference = expiryDate - Date.now();
      if (difference <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate) {
    return null;
  }

  return <div className="de_countdown">{timeLeft}</div>;
};


function Slider2() {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        if (response.data) {
          setNewItems(response.data);
        } else {
          setNewItems([]);
        }
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewItems();
  }, []);

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="slider-container" style={{ padding: "0 20px" }}>
      <Slider {...settings}>
        {loading
          ? new Array(4).fill(0).map((_, index) => (
              <div key={index} style={{ padding: "0 10px"}}>
                <div className="nft__item">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <Skeleton width="100%" height="200px" />
                  <Skeleton width="100%" height="25px" style={{ display: "flex", flexDirection: "column", gap: "5px" }} />
                  <Skeleton width="80%" height="15px" /> 
                  <Skeleton width="20px" height="20px" />
                </div>
              </div>
            ))
          : newItems.map((newItem) => (
              <div key={newItem.id} style={{ padding: "0 10px"}}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${newItem.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator"
                    >
                      <img className="lazy" src={newItem.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  
                  <CountdownTimer expiryDate={newItem.expiryDate} />
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

                    <Link to={`/item-details/${newItem.nftId}`}>
                      <img
                        src={newItem.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${newItem.nftId}`}>
                      <h4>{newItem.title}</h4>
                    </Link>
                    <div className="nft__item_price">{newItem.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{newItem.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </Slider>
    </div>
  );
}

export default Slider2;
