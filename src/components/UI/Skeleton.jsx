import React from "react";

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width : "200px",
        height : "100%",
        borderRadius,
        backgroundColor: "#ddd",
        
        
      }}
    ></div>
  );
};

export default Skeleton;
