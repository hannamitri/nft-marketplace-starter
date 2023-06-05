import React from "react";
import Skeleton from "../UI/Skeleton";
import { Link } from "react-router-dom";

function HotItemLoadingState() {
  return (
    <div className="nft_coll">
      <div className="nft_wrap">
        <Link to="/item-details">
          {
            <Skeleton
              className="lazy img-fluid"
              width={"100%"}
              height={"100%"}
            />
          }
        </Link>
      </div>
      <div className="nft_coll_pp">
        <Link to="/author">
          {
            <Skeleton
              className="lazy pp-coll"
              width={60}
              height={60}
              borderRadius={100}
            />
          }
        </Link>
        <i className="fa fa-check"></i>
      </div>
      <div className="nft_coll_info">
        <Link to="/explore">
          <h4>{<Skeleton width={80} height={20} />}</h4>
        </Link>
        <span>{<Skeleton width={60} height={20} />}</span>
      </div>
    </div>
  );
}

export default HotItemLoadingState;
