import React from "react";


const ExploreHeader = ({ setSortType }) => {
  return (
    <div className="col-lg-12">
      <div className="items_filter">

        <div id="item_category" className="dropdown">
          <select
            className="btn-selector"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price_low">Price, Low to High</option>
            <option value="price_high">Price, High to Low</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default ExploreHeader;