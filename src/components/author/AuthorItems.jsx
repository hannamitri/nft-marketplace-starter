import React from "react";
import NFTCard from "../UI/NFTCard";

const AuthorItems = ({ items = [], nfts, author }) => {
  const collection = Array.isArray(nfts)
    ? nfts
    : Array.isArray(items)
    ? items
    : [];

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {collection.length > 0 ? (
            collection.map((nft, index) => {
              const item = {
                ...nft,
                nftId: nft.nftId || nft.id,
                nftImage: nft.nftImage || nft.image,
                authorId: nft.authorId || author?.authorId,
                authorImage:
                  nft.authorImage ||
                  author?.authorImage ||
                  author?.image,
              };

              return (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.nftId || index}
                >
                  <NFTCard item={item} />
                </div>
              );
            })
          ) : (
            <div className="col-md-12 text-center">
              <p>No NFTs found for this author.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;