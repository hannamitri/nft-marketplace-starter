import React from "react";
import { Link } from "react-router-dom";
function LazyLoadNewItem() {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to=""
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          <div className="overlay__loading--pp top-sellers__pp"></div>
          <i className="fa fa-check"></i>
        </Link>
      </div>
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
        <Link to="">
          <div className="overlay__loading--image  loading__image"></div>
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to="">
          <h4 className="loading loading__title">Pinky Ocean</h4>
        </Link>
        <div className="nft__item_price loading loading__title">3.08 ETH</div>
        <div className="nft__item_like loading">
          <i className="fa fa-heart"></i>
          <span className="loading">69</span>
        </div>
      </div>
    </div>
  );
}

export default LazyLoadNewItem;
