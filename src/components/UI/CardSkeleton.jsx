import React from "react";
import Skeleton from "./Skeleton";

const CardSkeleton = () => {
  return (
    <div className="nft__item">
      <Skeleton width="100%" height="200px" borderRadius="8px" />
      <div style={{ padding: "10px" }}>
        <Skeleton width="60%" height="20px" borderRadius="4px" />
        <Skeleton width="40%" height="20px" borderRadius="4px" style={{ marginTop: "8px" }} />
      </div>
    </div>
  );
};

export default CardSkeleton;
