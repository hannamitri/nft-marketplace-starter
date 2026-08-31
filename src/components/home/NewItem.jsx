import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItem = ({ item }) => {
  const {
    title = "Pinky Ocean",
    price = "3.08 ETH",
    likes = 69,
    creator = "Monica Lucas",
    countdown = "5h 30m 32s",
    link = "/item-details",
    authorImage = AuthorImage,
    image = nftImage,
   } = item || {};

  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to="/author"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={`Creator: ${creator}`}
          >
            <img src={authorImage} alt={creator} />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        <div className="de_countdown">{countdown}</div>

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="https://www.facebook.com/"
                 target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="https://twitter.com/
                " target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="mailto:">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <Link to={link}>
            <img src={image} className="nft__item_preview" alt={title} />
          </Link>
        </div>

        <div className="nft__item_info">
          <Link to={link}>
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
};

export default NewItem;
