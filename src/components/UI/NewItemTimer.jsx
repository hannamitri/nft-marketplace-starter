import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NewItemTimer({ item }) {
  // let startTime;
  let cancelId;
  let timeLeft;
  let seconds;
  let minutes;
  let hours;
  const countdown = item.expiryDate;
  // const [text, setText] = useState([])
  const [hoursText, setHoursText] = useState([]);
  const [minutesText, setMinutesText] = useState([]);
  const [secondsText, setSecondsText] = useState([]);

  useEffect(() => {
    startTimer(() => {
      cancelAnimationFrame(cancelId);
    });
  }, []);

  function startTimer() {
    // startTime = Date.now();
    // console.log(startTime);
    cancelId = requestAnimationFrame(updateTimer);
  }

  function updateTimer() {
    timeLeft = countdown - Date.now();

    seconds = Math.floor(timeLeft / 1000);
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);

    if (timeLeft < 0) {
      cancelAnimationFrame(cancelId);
    } else {
      setHoursText(hours);
      setMinutesText(minutes % 60);
      setSecondsText(seconds % 60);

      cancelId = requestAnimationFrame(updateTimer);
    }
  }
  // takeaway the expiryDate date.now 
  // need to get date.now
  // in hours.minutes.seconds
  // useeffect for timer
  // pass this page into new items and then wrap it in owl carousel

  return (
    <div className="nft__item" src={item.id}>
      <div className="author_list_pp">
        <Link
          to="/author"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          <img className="lazy" src={item.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {secondsText > 0 && (
        <div className="de_countdown">
          {hoursText}h {minutesText}m {secondsText}s
        </div>
      )}

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <Link to="/item-details">
          <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to="/item-details">
          <h4 className="item_title">{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span className="item__likes">{item.likes}</span>
        </div>
      </div>
    </div>
  );
}
