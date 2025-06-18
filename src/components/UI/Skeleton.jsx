import React from "react";

const Skeleton = ({ width, height, borderRadius, children }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#eee",
        overflow: "hidden",
      }}
    >
      <div className="nft_coll">
      <div className="nft_wrap">
        <div className="skeleton skeleton-img" />
      </div>
      <div className="nft_coll_pp">
        <div className="skeleton skeleton-avatar" />
      </div>
      <div className="nft_coll_info">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-code" />
      </div>
    </div>
    {children}
    </div>
  );
};

export default Skeleton;
