import React from "react";

const TopSellersSkeletonLoader = ({ style, loading }) => {
  return <div style={{ ...defaultStyle, ...style }} className="top-sellers-skeleton-loader">
     {loading && <i className="fa fa-check"></i>}
  </div>;
};

const defaultStyle = {
  backgroundColor: "#e0e0e0",
  borderRadius: "4px",
  width: "100%",
  height: "100%",
};

export default TopSellersSkeletonLoader;
