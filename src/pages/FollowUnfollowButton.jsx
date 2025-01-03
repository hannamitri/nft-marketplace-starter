import React, { useState } from "react";

function FollowUnfollowButton({ initialFollowing, followers }) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [followerCount, setFollowerCount] = useState(followers); 

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    if (isFollowing) {
      setFollowerCount(followerCount - 1);
    } else {
      setFollowerCount(followerCount + 1);
    }
  };

  return (
    <div>
        <div className="profile_follow de-flex">
      <div className="de-flex-col">
        <div className="profile_follower">{followerCount} followers</div>
        <button className="btn-main" onClick={handleFollowClick}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
      </div>
    </div>
  );
}

export default FollowUnfollowButton;
