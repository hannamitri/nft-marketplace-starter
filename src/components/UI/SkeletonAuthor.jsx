import React from "react";
import Skeleton from "./Skeleton";

const SkeletonAuthor = () => {
  return (
    <>
    <div className="profile_avatar">
    <Skeleton width="150px" height="150px" borderRadius="50%" />
    <i className="fa fa-check"></i>
      <div className="profile_name">
        <h4>
          <Skeleton width="55%" height="25px" />
          <span className="profile_username">
            <Skeleton width="40%" height="20px" />
          </span>
          <span id="wallet" className="profile_wallet">
            <Skeleton width="75%" height="15px" />
          </span>
          <button id="btn_copy" title="Copy Text">
            <Skeleton width="55%" height="15px" />
          </button>
        </h4>
      </div>
    </div>

    <div className="profile_follow de-flex">
      <div className="de-flex-col">
        <div className="profile_follower">
          <Skeleton width="60%" height="20px" />
        </div>
        <button className="btn-main">
          <Skeleton width="50px" height="15px" />
        </button>
      </div>
    </div>
    </>
  );
};

export default SkeletonAuthor;