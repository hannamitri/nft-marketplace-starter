import React from "react";
import { Link } from "react-router-dom";

const ItemCardSkeleton = () => {
  return (
    <div className="nft_coll mx-1">
      <div
        style={{
          backgroundColor: "#D3D3D3",
        }}
        className="nft_wrap"
      >
        <Link to="/item-details">
          <img src={null} className="lazy img-fluid" alt="" />
        </Link>
      </div>
      <div className="row">
        <div className="nft_coll_pp">
          <Link to="/author">
            <img className="lazy pp-coll" src={null} alt="" />
          </Link>
          <i className="fa fa-check"></i>
        </div>
        <div
          className="nft_coll_info flex-center"
          style={{
            marginTop: "4px",
          }}
        >
          <Link to="/explore">
            <div
              style={{
                backgroundColor: "#D3D3D3",
                height: "16px",
                width: "68px",
              }}
            ></div>
          </Link>
          <div
            style={{
              backgroundColor: "#D3D3D3",
              marginTop: "4px",
              height: "16px",
              width: "38px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ItemCardSkeleton;