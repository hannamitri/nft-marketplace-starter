import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NftWithTimer = ({ nft }) => {
  const [liked, setLiked] = useState(false);
  const [expireDate, setExpireDate] = useState(
    Math.floor((nft.expiryDate - Date.now()) / 1000)
  );

  useEffect(() => {
    let isMounted = true;

    const updateExpireDate = () => {
      if (isMounted) {
        setExpireDate((prevExpireDate) => prevExpireDate - 1);
      }
    };

    const timerId = setInterval(updateExpireDate, 1000);

    return () => {
      isMounted = false;
      clearInterval(timerId);
    };
  }, [nft.expiryDate]);

  function printTime(releaseDate) {
    if (releaseDate > 0) {
      const seconds = expireDate;
      const minutes = seconds / 60;
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = Math.floor(minutes % 60);
      const remainingSeconds = (seconds % 60) % 60;
      return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
    }

    if (releaseDate - Date.now() === 0) {
      return "EXPIRED";
    }
  }

  function handleLike() {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  }

  return (
    <div data-aos="fade-in" className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${nft.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas">
          <img className="lazy" src={nft.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {nft.expiryDate ? (
        <div className="de_countdown">{printTime(expireDate)}</div>
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

        <Link to={`/item-details/${nft.nftId}`}>
          <img src={nft.nftImage} className="lazy nft__item_preview" alt="" />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${nft.nftId}`}>
          <h4>{nft.title}</h4>
        </Link>
        <div className="nft__item_price">{nft.price} ETH</div>
        <div className="nft__item_like" onClick={handleLike}>
          {liked ? (
            <>
              <i className="fa fa-heart heart-red"></i>
              <span>{nft.likes + 1}</span>
            </>
          ) : (
            <>
              <i className="fa fa-heart"></i>
              <span>{nft.likes}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NftWithTimer;
