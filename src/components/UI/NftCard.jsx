import React from "react";
import { Link } from "react-router-dom";
import AuthorImageFallback from "../../images/author_thumbnail.jpg";
import NftImageFallback from "../../images/nftImage.jpg";
import CountdownTimer from "../CountdownTimer";

const NftCard = ({
  item,
  authorId: pageAuthorId,
  authorName: pageAuthorName,
  authorImage: pageAuthorImage,
}) => {
  const {
    authorId: itemAuthorId,
    authorName: itemAuthorName,
    authorImage: itemAuthorImage,
    nftId,
    nftImage,
    title,
    price,
    likes,
    expiryDate,
  } = item;

  const cardAuthorId = itemAuthorId || pageAuthorId;
  const cardAuthorName = itemAuthorName || pageAuthorName;
  const cardAuthorImage = itemAuthorImage || pageAuthorImage;

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${cardAuthorId}`}
          title={`Creator:${cardAuthorName}`}
        >
          <img
            className="lazy"
            src={cardAuthorImage || AuthorImageFallback}
            alt={cardAuthorName}
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {expiryDate && <CountdownTimer expiryDate={expiryDate} />}

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
          <img
            src={nftImage || NftImageFallback}
            className="lazy nft__item_preview"
            alt={title}
          />
        </Link>
      </div>

      <div className="nft__item_info">
        <Link to={`/item-details/${nftId}`}>
          <h4>{title || "Untitled"}</h4>
        </Link>
        <div className="nft__item_price">{price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
