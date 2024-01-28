/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Skeleton } from "../UI/Skeleton"
import Card from "../Card";
const AuthorItems = ({ authorDetails }) => {
  const skeletonLoading = new Array(8).fill(0).map((_, index) => (
    <div
      key={index}
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <Skeleton width="100%" height="400px" />
      </div>
    </div>
  ));

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {
            authorDetails ? authorDetails.nftCollection.map((item) => (
              <Card item={item} authorImage={authorDetails.authorImage}
                key={item.id}
                responsiveStyling={"col-lg-3 col-md-6 col-sm-6 col-xs-12"} />
            )) : skeletonLoading
          }
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
