import React from "react";
import Skeleton from "../UI/Skeleton";
import NftCard from "../UI/NftCard";

const AuthorItems = ({ items, authorId, authorImage }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!items &&
            new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <Skeleton width="100%" height="400px" borderRadius="15px" />
              </div>
            ))}
          {items?.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <NftCard item={{ ...item, authorId, authorImage }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
