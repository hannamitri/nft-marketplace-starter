import React from "react";

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item">
        <div className="skeleton-box" style={{ height: "200px", marginBottom: "10px" }}></div>

         <div className="skeleton-box" style={{ height: "20px", width: "60%", marginBottom: "10px" }}></div>
         
          <div className="skeleton-box" style={{ height: "15px", width: "40%" }}></div>
    </div>
    </div>
  );
};

export default Skeleton;
