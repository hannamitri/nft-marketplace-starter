import React from "react";


export default function NFTSkeleton() {
  return (
    <div className="nft_coll">
      <div
        className="nft_wrap skeleton-box"
        style={{ width: "100%", height: 200 }}
      />
      <div className="nft_coll_pp">
        <div
          className="skeleton-box"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      </div>
      <div className="nft_coll_info">
        <div className="skeleton-box" style={{ width: "60%", height: 16 }} />
        <div
          className="skeleton-box"
          style={{ width: "30%", height: 12, marginTop: 6 }}
        />
      </div>
    </div>
  );
}
