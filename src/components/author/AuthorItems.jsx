import React from "react";
import NftItemCard from "../common/NftItemCard";

const AuthorItems = ({ author }) => {
  if (!author) {
    return null;
  }

  const collection = Array.isArray(author.nftCollection)
    ? author.nftCollection
    : [];

  if (collection.length === 0) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            <div className="col-md-12 text-center py-4">
              <p>No NFTs in this collection yet.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {collection.map((nft) => (
            <NftItemCard
              key={nft.nftId ?? nft.id}
              variant="authorProfile"
              item={{
                ...nft,
                authorId: author.authorId,
                authorImage: author.authorImage,
              }}
              columnClassName="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
