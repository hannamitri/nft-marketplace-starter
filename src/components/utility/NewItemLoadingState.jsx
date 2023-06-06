import React from "react";
import Skeleton from "../UI/Skeleton";
import { Link } from "react-router-dom";

function NewItemLoadingState() {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to="/author"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          <Skeleton
            className="lazy"
            width={50}
            height={50}
            borderRadius={100}
          />
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

        <Link to="/item-details">
          {
            <Skeleton className="lazy nft__item_preview" width={200} height={250} />
          }
            
          
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to="/item-details">
          <h4>
            <Skeleton width={"40%"} height={20} />
          </h4>
        </Link>
        <div className="nft__item_price">
          <Skeleton width={"100%"} height={20} />
        </div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default NewItemLoadingState;
