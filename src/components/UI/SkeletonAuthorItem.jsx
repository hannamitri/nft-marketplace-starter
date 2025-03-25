import React from "react";

import { Link } from "react-router-dom";

import Skeleton from "./Skeleton";

const SkeletonAuthorItem = () => {
  return (
     <div className="de_tab_content">
    <div className="nft__item">
      <div className="author_list_pp">
        <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
          <Skeleton width="50px" height="50px" borderRadius="50%" />

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

        <Link to="#">
          <Skeleton width="100%" height="225px" />
        </Link>
      </div>

      <div className="nft__item_info">
        <Link to="/item-details">
          <Skeleton width="100%" height="25px" />
        </Link>

        <div className="nft__item_price">
          <Skeleton width="25%" height="20px" />
        </div>

        <div className="nft__item_like">
          <Skeleton width="30px" height="15px" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default SkeletonAuthorItem;
