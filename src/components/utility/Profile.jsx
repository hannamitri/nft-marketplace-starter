import React from "react";
import { Link } from "react-router-dom";

const Profile = ({authorsData, followers, toggleLikes, followClicked}) => {
  return (
    <div className="d_profile de-flex">
      <div className="de-flex-col">
        <div className="profile_avatar">
          <img src={authorsData.authorImage} alt="" />

          <i className="fa fa-check"></i>
          <div className="profile_name">
            <h4>
              {authorsData.authorName}
              <span className="profile_username">@{authorsData.tag}</span>
              <span id="wallet" className="profile_wallet">
                {authorsData.address}
              </span>
              <button id="btn_copy" title="Copy Text">
                Copy
              </button>
            </h4>
          </div>
        </div>
      </div>
      <div className="profile_follow de-flex">
        <div className="de-flex-col">
          <div className="profile_follower">{followers} followers</div>
          <Link to="#" className="btn-main" onClick={toggleLikes}>
            {!followClicked ? "Follow" : "Unfollow"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
