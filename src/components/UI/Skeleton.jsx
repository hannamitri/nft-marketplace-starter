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
  if (type === "hotCollections") {
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
    );
  }

  if (type === "Author") {
    return (
      <div className="d_profile de-flex">
        <div className="de-flex-col">
          <div className="profile_avatar">
            <div
              className="skeleton-box"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            ></div>
            <i className="fa fa-check"></i>
            <div
              className="skeleton-text-wrapper"
              style={{ marginTop: "24px", marginLeft: "12px" }}
            >
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
              <div
                className="skeleton-box"
                style={{
                  width: "200px",
                  height: "20px",
                  marginTop: "8px",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="profile_follow de-flex" style={{ marginTop: "20px" }}>
          <div className="de-flex-col">
            <div
              className="skeleton-box"
              style={{ width: "100px", height: "32px", borderRadius: "4px" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "Details") {
    return (
      <div className="row">
        <div className="col-md-6 ">
          <div
            className="skeleton-box "
            style={{ width: "100%", height: "400px" }}
          ></div>
        </div>
        <div className="col-md-6">
          <div className="skeleton-text-wrapper">
            <div
              className="skeleton-box "
              style={{
                width: "300px",
                height: "30px",
                marginBottom: "16px",
              }}
            ></div>
            <div className="item_info_counts">
              <div
                className="skeleton-box "
                style={{ width: "50px", height: "20px", marginRight: "16px" }}
              ></div>
              <div
                className="skeleton-box "
                style={{ width: "50px", height: "20px" }}
              ></div>
            </div>
            <div
              className="skeleton-box "
              style={{ width: "100%", height: "150px", marginTop: "16px" }}
            ></div>
            <div
              className="skeleton-box "
              style={{
                width: "100px",
                height: "20px",
                marginTop: "16px",
                marginBottom: "8px",
              }}
            ></div>
            <div className="skeleton-box " style={{ width: "64px", height: "64px", borderRadius: "50%", display: "inline-block", verticalAlign: "middle", marginRight: "12px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Add more cases for other types of components

  return <div>Unknown skeleton type</div>;
};

export default SkeletonItem;
