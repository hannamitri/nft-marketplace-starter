import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

function NewItem({ data }) {
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!data?.expiryDate) {
      return;
    }
    const expiryTime = new Date(data.expiryDate).getTime();
    const currentTime = new Date().getTime();
    const distance = expiryTime - currentTime;
    if (distance < 0) {
      setExpired(true);
      return;
    }
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setTimeRemaining({ hours, minutes, seconds });
    setLoading(false);
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const distance = expiryTime - currentTime;
      if (distance < 0) {
        setExpired(true);
        clearInterval(intervalId);
        return;
      }
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeRemaining({ hours, minutes, seconds });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  const mountedRef = useRef(true);

  useEffect(() => {
    const img = new Image();
    img.src = data?.authorImage;
    img.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setLoading(false);
        }
      }, 300);
    };
    return () => {
      mountedRef.current = false;
    };
  }, [data?.authorImage]);

  return (
    <>
      {loading ? (
        <div className="nft__item">
          <div className="author_list_pp">
            <Link
              to="/author"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator: Monica Lucas">
              <Skeleton width="50px" height="50px" borderRadius="50%" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div className="de_countdown"></div>

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

            <Link to="/item-details">
              <Skeleton width="100%" height="350px" />
            </Link>
          </div>
          <div className="nft__item_info">
            <Link to="/item-details">
              <Skeleton width="180px" height="30px" />
            </Link>
            <Skeleton width="100px" height="20px" />
            <div className="nft__item_like">
              <Skeleton width="30px" height="15px" />
            </div>
          </div>
        </div>
      ) : (
        <div className="nft__item">
          <div className="author_list_pp">
            <Link
              to="/author"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator: Monica Lucas">
              <img className="lazy" src={data?.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          {data?.expiryDate ? (
            <div className="de_countdown">
              {!expired ? (
                `${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`
              ) : (
                <div>EXPIRED</div>
              )}
            </div>
          ) : null}
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

            <Link to="/item-details/">
              <img
                src={data?.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
            </Link>
          </div>
          <div className="nft__item_info">
            <Link to="/item-details">
              <h4>{data?.title}</h4>
            </Link>
            <div className="nft__item_price">{data?.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{data?.likes}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewItem;
