import React from "react";

const SkeletonProfile = () => {
  return (
    <div className="author-page-skeleton">
      <div className="author-banner-skeleton skeleton-shimmer"></div>

      <div className="author-profile-skeleton">
        <div className="author-profile-main-skeleton">
          <div className="author-profile-avatar-skeleton skeleton-shimmer"></div>

          <div className="author-profile-copy-skeleton">
            <div className="author-name-skeleton skeleton-shimmer"></div>

            <div className="author-tag-skeleton skeleton-shimmer"></div>

            <div className="author-address-skeleton skeleton-shimmer"></div>
          </div>
        </div>

        <div className="author-follow-skeleton">
          <div className="author-followers-skeleton skeleton-shimmer"></div>

          <div className="author-button-skeleton skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfile;