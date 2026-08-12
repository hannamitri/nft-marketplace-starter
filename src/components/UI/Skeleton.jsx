import React from "react";

const Skeleton = () => {
  return (
    <div className="nft__item" >
      <div className="author_list_pp">
        <div className="skeleton skeleton-avatar" />
        <i className="fa fa-check"></i>
      </div>
      <div className="nft__item_wrap ">
        <div className="skeleton skeleton-pic" />
      </div>
      <div className="nft__item_info">
        <div className="item-details skeleton skeleton_title" />
        <div className="nft__item_price skeleton skeleton_subtitle " />
      </div>
    </div>
  );
};

export default Skeleton;
