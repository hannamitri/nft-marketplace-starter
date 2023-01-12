import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

export default function AuthorInfo({
  address,
  authImg,
  authName,
  followers,
  tag,
  loading,
}) {
  const [follow, setFollow] = useState(false);

  function followUser() {
    setFollow(!follow);
    if (follow) {
      followers += 1;
    }
    console.log(`clicked`, followers);
  }

  return (
    <div className="col-md-12">
      <div className="d_profile de-flex">
        <div className="de-flex-col">
          {!loading ? (
            <div className="profile_avatar">
              <img src={authImg} alt="" />

              <i className="fa fa-check"></i>
              <div className="profile_name">
                <h4>
                  {authName}
                  <span className="profile_username">{tag}</span>
                  <span id="wallet" className="profile_wallet">
                    {address}
                  </span>
                  <button id="btn_copy" title="Copy Text">
                    Copy
                  </button>
                </h4>
              </div>
            </div>
          ) : (
            <div className="profile_avatar">
              <Skeleton width={"150px"} height={"150px"} borderRadius={"50%"} />
              <div className="profile_name">
                <Skeleton
                  width={"200px"}
                  height={"94px"}
                  borderRadius={"8px"}
                />
              </div>
            </div>
          )}
        </div>
        <div className="profile_follow de-flex">
          {!loading ? (
            <div className="de-flex-col">
              <div className="profile_follower">
                {follow ? followers : followers + 1} followers
              </div>
              <Link to="#" className="btn-main" onClick={followUser}>
                {follow ? `Follow` : `Unfollow`}
              </Link>
            </div>
          ) : (
            <div className="de-flex-col">
              <Skeleton height={"42px"} width={"240px"} borderRadius={"8px"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
