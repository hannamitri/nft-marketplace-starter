import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NewItem({item}) {
  const { expiryDate } = item;
  const [now, setNow] = useState(0);

  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const useGetTimeRemaining = (expiryDate) => {
    const [now, setNow] = useState(Date.now());
  
     useEffect(() => {
      if (!expiryDate) return;

      const interval = setInterval(() => {
        setNow(Date.now());
      }, 1000);

      return () => clearInterval(interval);
    }, [expiryDate]);
  };
    const getTimeRemaining = (expiryDate) => {
    const distance = expiryDate - now; // Calculate the distance in milliseconds

    if (distance <= 0) {
      return null; // Countdown Finished
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setHoursLeft(hours);
    setMinutesLeft(minutes);
    setSecondsLeft(seconds);

   return getTimeRemaining();
  };

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          <img className="lazy" src={item.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {expiryDate && (
        <div className="de_countdown">
          <span>{hoursLeft}h</span>
          <span>{minutesLeft}m</span> <span>{secondsLeft}s</span>{" "}
        </div>
      )}
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
        <Link to={`/item-details/${item.id}`}>
          <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.id}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>69</span>
        </div>
      </div>
    </div>
  );
};

export default NewItem;
