import React from "react";

import AuthorPageItem from "../UI/AuthorPageItem";

const AuthorItems = ({ nftCollection, authorImage }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map((nft, index) => (
            <AuthorPageItem nft={nft} authorImage={authorImage} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
