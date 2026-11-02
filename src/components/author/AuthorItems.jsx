import React, { useState } from "react";
import NFTItemSkeleton from "../UI/NFTItemSkeleton";
import NFTItemCard from "../UI/NFTItemCard";
import LoadMoreButton from "../UI/LoadMoreButton";

const AuthorItems = ({ items = [], loading }) => {
  const [visibleCount, setVisibleCount] = useState(8);

  const loadMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ display: "block", backgroundSize: "cover" }}
                >
                  <NFTItemSkeleton />
                </div>
              ))
            : items.slice(0, visibleCount).map((item) => (
                <div
                  key={item.id}
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ display: "block", backgroundSize: "cover" }}
                >
                  <NFTItemCard item={item} />
                </div>
              ))}
        </div>
      </div>

      {/* Render Load More Button if there are more items to reveal */}
      {!loading && visibleCount < items.length && (
        <LoadMoreButton onClick={loadMoreItems} />
      )}
    </div>
  );
};

export default AuthorItems;