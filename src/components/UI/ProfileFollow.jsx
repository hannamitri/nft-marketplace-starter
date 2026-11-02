import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileFollow = ({ followersCount }) => {
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (followersCount !== undefined) {
      setFollowers(followersCount);
    }
  }, [followersCount]);

  const handleFollowClick = (event) => {
    event.preventDefault();
    if (isFollowing) {
      setFollowers((prev) => prev - 1);
      setIsFollowing(false);
    } else {
      setFollowers((prev) => prev + 1);
      setIsFollowing(true);
    }
  };

  return (
    <div className="profile_follow de-flex">
      <div className="de-flex-col">
        <div className="profile_follower">{followers} followers</div>
        <Link to="#" className="btn-main" onClick={handleFollowClick}>
          {isFollowing ? "Unfollow" : "Follow"}
        </Link>
      </div>
    </div>
  );
};

export default ProfileFollow;
