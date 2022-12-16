import React from "react";
import { Link } from "react-router-dom";

const SkeletonItemsDetailsPage = () => {
  return (
    <div className="row">
      <div className="col-md-6 text-center">
        <div className="skeleton_loding-Image skeleton"></div>
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <div className="item_info_title--loading skeleton"></div>

          <div className="item_info_counts">
            <div className="item_info_views--loading skeleton"></div>
            <div className="item_info_views--loading skeleton"></div>
          </div>
          <div className="item_info_description--loading skeleton"></div>
          <div className="d-flex flex-row">
            <div className="mr40">
            <h6>Owner</h6>
              <div className="item_author skeleton">
                <div className="author_list_pp---details">
                  <Link to="/">
                    <div className="pp-coll_loading" alt=""></div>
                  </Link>
                </div>
                <div className="author_list_info">
                  <Link to="">{}</Link>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="de_tab tab_simple">
            <div className="de_tab_content">
              <h6>Creator</h6>
              <div className="item_author">
              <div className="author_list_pp---details skeleton">
                  <Link to="/">
                    <div className="pp-coll_loading skeleton" alt=""></div>
                  </Link>
                </div>
                <div className="author_list_info skeleton">
                  <Link to={""}>{}</Link>
                </div>
              </div>
            </div>
            <div className="spacer-40 skeleton"></div>
            <h6>Price</h6>
            <div className="nft-item-price--loading skeleton">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonItemsDetailsPage;
