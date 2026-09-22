import React from "react";
import Skeleton from "./Skeleton";

const DEFAULT_COLS = [
  "col-xl-3 col-lg-4 col-md-6 col-12",
  "col-xl-3 col-lg-4 col-md-6 d-none d-md-block",
  "col-xl-3 col-lg-4 d-none d-lg-block",
  "col-xl-3 d-none d-xl-block",
];

const ItemSkeletons = ({ cols = DEFAULT_COLS }) => (
  <>
    {cols.map((colsClass, index) => (
      <div className={colsClass} key={index}>
        <div className="nft__item">
          <div className="author_list_pp">
            <Skeleton width="50px" height="50px" borderRadius="50%" />

            <i className="fa fa-check"></i>
          </div>
          <div className="nft__item_wrap">
            <Skeleton width="100%" height="350px" />
          </div>
          <div className="nft__item_info">
            <Skeleton width="180px" height="30px" />
            <div className="nft__item_price">
              <Skeleton width="100px" height="20px" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

export default ItemSkeletons;
