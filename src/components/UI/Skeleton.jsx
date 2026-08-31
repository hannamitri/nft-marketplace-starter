import React from "react";
import "./Skeleton.css";


const Skeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton-author-wrap">
        <div className="skeleton skeleton-author"></div>
      </div>
      <div className="skeleton-info">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    </div>
  );
};

export default Skeleton;