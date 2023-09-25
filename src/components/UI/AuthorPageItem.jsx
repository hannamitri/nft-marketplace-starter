import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthorPageItem = ({ nft, authorImage }) => {
  const [liked, setLiked] = useState(false);

  function handleLike() {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  }

  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div className="nft__item">
          <div className="author_list_pp">
            <div>
              <img className="lazy" src={authorImage} alt="" />
              <i className="fa fa-check"></i>
            </div>
          </div>
          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                </div>
              </div>
            </div>
            <Link to={`/item-details/${nft.nftId}`}>
              <img
                src={nft.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
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
      </div>
    </>
  );
};

export default AuthorPageItem;
