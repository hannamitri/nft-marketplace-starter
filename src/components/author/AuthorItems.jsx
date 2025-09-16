import React from "react";
import NftCard from "../UI/NftCard";

const AuthorItems = ({ items, authorId, authorName, authorImage }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item) => (
            <div
              key={item.nftId}
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            >
              <NftCard
                item={item}
                authorId={authorId}
                authorName={authorName}
                authorImage={authorImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
