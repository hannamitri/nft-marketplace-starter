import React from "react";
import "../../css/styles/loadingState.css";

const SkeletonItem = ({ type }) => {
  if (type === "Items") {
    return (
      <div className="nft__item">
        <div className="nft__item_wrap">
          <div
            className="skeleton-box"
            style={{ width: "100%", height: "240px" }}
          ></div>
        </div>
        <div className="nft__item_info">
          <div className="skeleton-text-wrapper">
            <div
              className="skeleton-box"
              style={{
                width: "200px",
                height: "20px",
                marginBottom: "8px",
              }}
            ></div>
            <div
              className="skeleton-box"
              style={{ width: "100px", height: "20px" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
  if(type === "hotCollections") {
    return (
      <div className="nft_coll">
      <div className="nft_wrap">
        <div
          className="skeleton-box"
          style={{ width: "100%", height: "240px" }}
        ></div>
      </div>
      <div className="nft_coll_pp">
        <div
          className="skeleton-box"
          style={{ width: "64px", height: "64px", borderRadius: "50%" }}
        ></div>
        <i className="fa fa-check"></i>
      </div>
      <div className="nft_coll_info">
        <div className="skeleton-text-wrapper">
          <div
            className="skeleton-box"
            style={{ width: "200px", height: "20px", marginBottom: "8px" }}
          ></div>
          <div
            className="skeleton-box"
            style={{ width: "100px", height: "20px" }}
          ></div>
        </div>
      </div>
    </div>
    )
  }

  // Add more cases for other types of components

  return <div>Unknown skeleton type</div>;
};

export default SkeletonItem;
