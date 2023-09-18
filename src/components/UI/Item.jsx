import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CountdownTimer(expiryDate) {
  const timeLeftInSeconds = (expiryDate - Date.now()) / 1000;
  const startTime = Date.now();

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  function updateTimer() {
    const secondsElapsed = (Date.now() - startTime) / 1000;
    const updateCountdown = timeLeftInSeconds - secondsElapsed;

    setSeconds(Math.floor(updateCountdown) % 60);
    setMinutes(Math.floor(updateCountdown / 60) % 60);
    setHours(Math.floor(updateCountdown / (60 * 60)) % 24);
  }

  useEffect(() => {
    const interval = setInterval(() => updateTimer(), 100);
    return () => clearInterval(interval);
  }, []);

  if (timeLeftInSeconds < 0 || !expiryDate) {
    return <div></div>;
  }

  return (
    <div className="de_countdown">
      {seconds < 0 ? (
        <span> EXPIRED </span>
      ) : (
        <span>
          {hours}h {minutes}m {seconds}s
        </span>
      )}
    </div>
  );
}

export default function Item({ item }) {
  return (
    <div key={item?.id}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={`/author/${item?.authorId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Creator: Monica Lucas"
          >
            <img className="lazy" src={item?.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        {CountdownTimer(item?.expiryDate)}

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

          <Link to={`/item-details/${item?.nftId}`}>
            <img
              src={item?.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>{item?.title}</h4>
          </Link>
          <div className="nft__item_price">{item?.price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item?.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
