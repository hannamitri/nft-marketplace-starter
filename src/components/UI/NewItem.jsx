import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
import useCountDown from "../../hooks/useCountDown";

function NewItem({ newItemsData }) {
  const [loading, setLoading] = useState(true);
  const { expired, hours, minutes, seconds } = useCountDown(
    newItemsData?.expiryDate
  );

  const mountedRef = useRef(true);

  useEffect(() => {
    const img = new Image();
    img.src = newItemsData.authorImage;
    img.onload = () => {
      setTimeout(() => {
        if (mountedRef) {
          setLoading(false);
        }
      }, 1000);
    };
    return () => {
      mountedRef.current = false;
    };
  }, [newItemsData.authorImage]);
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
              <img className="lazy" src={newItemsData?.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          {newItemsData?.expiryDate ? (
            <div className="de_countdown">
              {expired ? (
                <div>EXPIRED</div>
              ) : (
                `${hours}h ${minutes}m ${seconds}s`
              )}
            </div>
          ) : null}
          {expired ? <div className="de_countdown">EXPIRED</div> : null}
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
                src={newItemsData?.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
            </Link>
          </div>
          <div className="nft__item_info">
            <Link to="/item-details">
              <h4>{newItemsData?.title}</h4>
            </Link>
            <div className="nft__item_price">{newItemsData?.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{newItemsData?.likes}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewItem;
