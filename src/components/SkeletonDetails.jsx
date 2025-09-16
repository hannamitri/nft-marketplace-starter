import React from "react";

const SkeletonDetails = () => {
  return (
    <div className="container" style={{ marginTop: "3rem" }}>
      <div className="row">
        {/* Image Skeleton */}
        <div className="col-md-6 text-center">
          <div className="skeleton skeleton-image-large" />
        </div>

        {/* Info Skeleton */}
        <div className="col-md-6">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-avatar" />
          <div className="skeleton skeleton-price" />
          <div className="skeleton skeleton-button" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetails;