import React from "react";
import NftItemCard from "../common/NftItemCard";
import NftItemCardSkeleton from "../common/NftItemCardSkeleton";

const AUTHOR_ITEMS_SKELETON_COUNT = 8;

const AuthorItems = ({ author, loading }) => {
  const items = Array.isArray(author?.nftCollection) ? author.nftCollection : [];

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading &&
            new Array(AUTHOR_ITEMS_SKELETON_COUNT)
              .fill(0)
              .map((_, index) => <NftItemCardSkeleton key={`author-loading-${index}`} />)}
          {!loading &&
            items.map((item, index) => (
              <NftItemCard
                key={item.id ?? item.nftId ?? index}
                item={{ ...item, authorId: author?.authorId, authorImage: author?.authorImage }}
                variant="authorProfile"
                authorImage={author?.authorImage}
              />
            ))}
          {!loading && items.length === 0 && (
            <div className="col-md-12">
              <p>No NFTs found for this author.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
