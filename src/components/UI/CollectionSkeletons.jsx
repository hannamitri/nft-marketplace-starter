import React from "react";
import Skeleton from "./Skeleton";

const SKELETON_COLS = [
  "col-xl-3 col-lg-4 col-md-6 col-12",
  "col-xl-3 col-lg-4 col-md-6 d-none d-md-block",
  "col-xl-3 col-lg-4 d-none d-lg-block",
  "col-xl-3 d-none d-xl-block",
];

const CollectionSkeletons = () => (
  <>
    {SKELETON_COLS.map((cols, index) => (
      <div className={cols} key={index}>
        <div className="nft_coll">
          <div className="nft_wrap">
            <Skeleton width="100%" height="200px" />
          </div>
          <div className="nft_coll_pp">
            <Skeleton width="50px" height="50px" borderRadius="50%" />
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Skeleton width="100px" height="20px" />
            <br />
            <Skeleton width="60px" height="20px" />
          </div>
        </div>
      </div>
    ))}
  </>
);

export default CollectionSkeletons;
