import { Skeleton } from "@mui/material";
import React from "react";

const ItemsSkeleton = () => {
  return (
    <div className="row">
      <div className="col-md-6 text-center">
        <Skeleton width={"500px"} height={"550px"} borderRadius={"14%"} bottom />
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <h2>
            <Skeleton width={"300px"} height={"70px"} />
          </h2>

          <div className="item_info_counts">
            <div className="item_info_views">
              <i className="fa fa-eye"></i>
              <Skeleton />
            </div>
            <div className="item_info_like">
              <i className="fa fa-heart"></i>
              <Skeleton />
            </div>
          </div>
          <Skeleton />
          <div className="d-flex flex-row">
            <div className="mr40">
              <h6>Owner</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <Skeleton height={"50px"} />
                  <i className="fa fa-check"></i>
                </div>
                <div className="author_list_info">
                  <Skeleton width={"200px"} height={"30px"} />
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="de_tab tab_simple">
            <div className="de_tab_content">
              <h6>Creator</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <Skeleton height={"50px"} />
                  <i className="fa fa-check"></i>
                </div>
                <div className="author_list_info">
                  <Skeleton width={"200px"} height={"30px"} />
                </div>
              </div>
            </div>
            <div className="spacer-40"></div>
            <h6>Price</h6>
            <div className="nft-item-price">
              <Skeleton width={"70px"} height={"40px"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsSkeleton;
