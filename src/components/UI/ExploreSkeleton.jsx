import React from "react";

const ExploreSkeleton = () => {
  return (
    <div className="nft__item">
      <div
        className="skeleton-box"
        style={{
          width: "100%",
          height: "250px",
          borderRadius: "10px",
        }}
      ></div>

      <div style={{ padding: "12px" }}>
        <div
          className="skeleton-box"
          style={{
            width: "70%",
            height: "16px",
            borderRadius: "4px",
            marginBottom: "8px",
          }}
        ></div>

        <div
          className="skeleton-box"
          style={{
            width: "40%",
            height: "14px",
            borderRadius: "4px",
            marginBottom: "8px",
          }}
        ></div>

        <div
          className="skeleton-box"
          style={{
            width: "30%",
            height: "14px",
            borderRadius: "4px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ExploreSkeleton;