import React from "react";

const SkeletonAuthorPage = () => {
  return (
    <div className="profile_avatar" data-aos='fade-down' data-aos-duration="2000">
      <div className="author_img--loading skeleton"></div>

      <i className="fa fa-check"></i>
      <div className="profile_name">
        <h4>
          <div className="author_name--loading skeleton"></div>
          <div className="profile_username--loading skeleton"></div>
          <div className="profile_wallet--loading skeleton"></div>
        </h4>
      </div>
    </div>
  );
};

export default SkeletonAuthorPage;
