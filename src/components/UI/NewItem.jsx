import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NewItem({
  title,
  image,
  expire,
  likes,
  nftImage,
  price,
  authorId,
  nftId,
}) {
  const [timer, setTimer] = useState(false);
  function countDown() {
    requestAnimationFrame(countDown);
    let milliseconds = expire - Date.now();

    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 24);
    setTimer(
      milliseconds > 0 ? `${hours}h ${minutes % 60}m ${seconds % 60}s` : null
    );
  }

  useEffect(() => {
    requestAnimationFrame(countDown);
  }, []);
  return (
    <div>
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={`/author/${authorId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Creator: Monica Lucas"
          >
            <img className="lazy" src={image} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {timer && <div className="de_countdown">{timer}</div>}

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

          <Link to={`/item-details/${nftId}`}>
            <img src={nftImage} className="lazy nft__item_preview" alt="" />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>{title}</h4>
          </Link>
          <div className="nft__item_price">{price}</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
