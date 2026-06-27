import React from "react";
import Countdown from "../UI/Countdown";
import { Link } from "react-router-dom";

function NewItem({ item, author, style }) {
  return (
    <div
      key={item.id}
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={style}
      data-aos="fade-in"
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={`/author/${author.authorId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
          >
            <img className="lazy" src={author.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}
        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
              </div>
            </div>
          </div>
          <Link to={`/item-details/${item.nftId}`}>
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt=""
              style={{ maxHeight: "345px" }}
            />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>{item.title}</h4>
          </Link>
          <div className="nft__item_price">{item.price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewItem;
