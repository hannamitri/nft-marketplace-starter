import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

function HotCollectionSkeleton({ data }) {
  return (
    <div className="nft_coll">
      <div className="nft_wrap">
        <Link to="/">
          <Skeleton width="100%" height="200px" borderRadius="8px">
            <img src={data?.nftImage} className="lazy img-fluid" alt="" />
          </Skeleton>
        </Link>
      </div>
      <div className="nft_coll_pp">
        <Link to="/">
          <Skeleton width="50px" height="50px" borderRadius="50%">
            <img className="lazy pp-coll" src={data?.authorImage} alt="" />
          </Skeleton>
        </Link>
        <i className="fa fa-check"></i>
      </div>
      <div className="nft_coll_info">
        <Link to="/">
          <Skeleton width="100px" height="20px">
            <h4>{data?.title}</h4>
          </Skeleton>
        </Link>
        <br />
        <Skeleton width="60px" height="20px"></Skeleton>
      </div>
    </div>
  );
}

export default HotCollectionSkeleton;
