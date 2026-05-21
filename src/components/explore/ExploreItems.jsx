import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import Skeleton from "../UI/Skeleton";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(""); //  took away the Loading...

  useEffect(() => {
    if (!expiryDate) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = new Date(expiryDate).getTime() - now;

      if (distance < 0) {
        return "Expired";
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

const ExploreItems = ({ items, visibleCount, loading }) => {
  if (loading) {
    return (
      <>
        {new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d_item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "black", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
              </div>
              <div className="nft__item_wrap">
                <Skeleton width="100%" height="250px" borderRadius="8px" />
              </div>
              <div className="nft__item_info">
                <Skeleton width="100px" height="20px" />
                <Skeleton width="60px" height="150px" />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {items &&
        items.slice(0, visibleCount).map((item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}

              <div className="nft__item_wrap">
                <div className="nft__item_buttons">
                  <i className="fa fa-shopping-basket"></i>
                </div>
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETN</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ExploreItems;