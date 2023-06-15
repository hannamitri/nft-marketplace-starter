import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const SkeletonCard = (index) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton height={"50px"} width={"50px"} borderRadius={"50%"} />
          <i className="fa fa-check"></i>
        </div>
        <div
          style={{
            position: "absolute",
            display: "inline-block",
            right: "20px",
          }}>
          <Skeleton
            height={"32px"}
            width={"110px"}
            borderRadius={"30px"}
            border={"none"}
          />
        </div>
        <div className="nft__item_wrap">
          <Link to="/item-details">
            <Skeleton height={"219px"} width={"219px"} borderRadius={"8px"} />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>
              <Skeleton height={"1rem"} width={"5rem"} />
            </h4>
          </Link>
          <div
            style={{
              display: "block",
            }}>
            <Skeleton height={"1rem"} width={"3rem"} />
          </div>
          <div className="nft__item_like">
            <span>
              <Skeleton height={".75rem"} width={"1rem"} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
