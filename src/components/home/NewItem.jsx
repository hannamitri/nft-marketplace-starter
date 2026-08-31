import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItem = ({ item }) => {
  const {
    nftImage: image = nftImage,
    authorImage = AuthorImage,
    title = "Untitled",
    price = 0,
    likes = 0,
  } = item || {};

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link to="/author">
          <img className="lazy" src={authorImage} alt="Author" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="nft__item_wrap">
        <Link to="/item-details">
          <img src={image} className="lazy nft__item_preview" alt={title} />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to="/item-details">
          <h4>{title}</h4>
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

export default NewItem;
