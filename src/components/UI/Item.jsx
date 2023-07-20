import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton.jsx";

function Item({ item }) {
  const [img, setImg] = useState();

  const mountedRef = useRef(true);

  useEffect(() => {
    const image = new Image();
    image.src = item.nftImage;
    image.onload = () => {
      if (mountedRef.current) {
        setImg(image);
      }
    };
    return () => {
      mountedRef.current = false;
    };
  }, [item.nftImage]);

  useEffect(() => {
    if (!item.expiryDate) {
      return;
    }

    let now = new Date().getTime();
    let timeleft = item.expiryDate - now;

    let hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, []);

  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  let x = setInterval(function () {
    if (!item.expiryDate) {
      return;
    }

    let now = new Date().getTime();
    let timeleft = item.expiryDate - now;

    let hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, 1000);

  return (
    <div className="nft__item">
      {!img ? (
        <>
          <div
            style={{
              height: "350px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Skeleton width={300} height={300} borderRadius={8}></Skeleton>
          </div>
          <div
            style={{
              display: "block",
            }}
          >
            <Skeleton width={120} height={18}></Skeleton>
          </div>
          <Skeleton width={80} height={18}></Skeleton>
        </>
      ) : (
        <>
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
          {item.expiryDate ? (
            <div className="de_countdown">{`${hours}h ${minutes}m ${seconds}s`}</div>
          ) : (
            <></>
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
            <div className="nft__item_price">{item.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{item.likes}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Item;
