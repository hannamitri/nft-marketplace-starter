import React from "react";
import NftCard from "../UI/NftCard";

const AuthorItems = ({ items }) => (
  <div className="de_tab_content">
    <div className="tab-1">
      <div className="row">
        {items.map((item) => (
          <div
            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            key={item.nftId}
          >
            <NftCard item={item} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AuthorItems;
