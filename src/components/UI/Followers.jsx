import React, { useState } from "react";
import { Link } from "react-router-dom";

function Followers({ followers }) {
  const [follower, setFollower] = useState(followers);
  const [clicked, setClicked] = useState(false);

  function addFollower() {
    setFollower(followers + 1);
    setClicked(true);
  }

  function removeFollower() {
    setFollower(followers);
    setClicked(false);
  }

  return (
    <>
      <div className="de-flex-col">
        <div className="profile_follower">{follower} followers</div>
        {clicked ? (
          <Link to="#" className="btn-main" onClick={() => removeFollower()}>
            Unfollow
          </Link>
        ) : (
          <Link to="#" className="btn-main" onClick={() => addFollower()}>
            Follow
          </Link>
        )}
      </div>
    </>
  );
}

export default Followers;