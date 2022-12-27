import React from "react";
import NftCard from "../UI/NftCard";

const AuthorItems = ({ items, authorId, authorImage }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items?.map((item) => (
            <NftCard
              key={item.id}
              item={item}
              responsiveclass={" col-lg-3 col-md-6 col-sm-6 col-xs-12"}
              authorId={authorId}
              authorImage={authorImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
