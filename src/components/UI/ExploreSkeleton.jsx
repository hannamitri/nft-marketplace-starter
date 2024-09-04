import React from "react";
import Skeleton from "./Skeleton";

const ExploreSkeleton = () => {
  return (
    <div
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <div>
            <Skeleton width={50} height={50} borderRadius={9999} />
            <i className="fa fa-check"></i>
          </div>
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
          <div>
            <Skeleton width={275} height={200} borderRadius={12} />
          </div>
        </div>
        <div className="nft__item_info">
          <div>
            <Skeleton width={100} height={16} borderRadius={4} />
          </div>
          <div className="nft__item_price">
            <Skeleton width={60} height={16} borderRadius={4} />
          </div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>
              <Skeleton width={24} height={10} borderRadius={4} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSkeleton;
