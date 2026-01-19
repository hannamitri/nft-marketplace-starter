import React, { useState } from "react";
import NFTCard from "../common/NFTCard";

const ExploreItems = ({ items, loading, filter, onFilterChange }) => {
  const [displayedItems, setDisplayedItems] = useState(8);

  const handleLoadMore = () => {
    setDisplayedItems(prev => prev + 4);
  };

  const itemsToDisplay = items.slice(0, displayedItems);

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={onFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <div className="skeleton skeleton-avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
              </div>
              <div className="de_countdown"></div>

              <div className="nft__item_wrap">
                <div className="skeleton skeleton-img" style={{ width: "100%", height: "300px" }}></div>
              </div>
              <div className="nft__item_info">
                <div className="skeleton skeleton-title" style={{ width: "70%", marginBottom: "10px" }}></div>
                <div className="skeleton skeleton-text" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
        ))
      ) : (
        itemsToDisplay.map((item, index) => (
          <NFTCard key={index} item={item} variant="grid" />
        ))
      )}
      {!loading && itemsToDisplay.length < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
