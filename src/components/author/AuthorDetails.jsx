import React, { useState } from "react";

const AuthorDetails = ({ author }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(author.followers || 0);

 const handleFollow = () => {
    setIsFollowing(true);
    setFollowers((prev) => prev + 1);
  };

  const handleUnfollow = () => {
    setIsFollowing(false);
    setFollowers((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="author-details">
      <img src={author.authorImage} alt={author.authorName} style={{ width: "100px", borderRadius: "50%" }} />
      <h2>{author.authorName}</h2>
      <div>
        Followers: {followers}
        {!isFollowing ? (
          <button onClick={handleFollow} style={{ marginLeft: 10 }}>Follow</button>
        ) : (
          <button onClick={handleUnfollow} style={{ marginLeft: 10 }}>Unfollow</button>
        )}
      </div>
      <p>{author.bio}</p>
    </div>
  );
};

export default AuthorDetails;