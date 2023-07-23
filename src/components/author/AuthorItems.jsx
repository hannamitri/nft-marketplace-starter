import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import ExploreNewItem from "../UI/exploreNewItem";
import SkeletonLoading from "../UI/SkeletonLoading";

const AuthorItems = ({ item, author }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {item?.length ? item?.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <ExploreNewItem item={item} author={author} />
            </div>
          )) : <SkeletonLoading />}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
