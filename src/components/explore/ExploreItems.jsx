import React, { useState } from "react";
import Explore from "./Explore";

const ExploreItems = () => {
  const [selectedFilter, setSelectedFilter] = useState("");

  return (
    <div className="explore-page container">
      <div className="text-center mb-5">
        <h2 className="mb-3">Explore NFTs</h2>

        <div className="filter-box d-flex justify-content-center align-items-center gap-3">
          <label htmlFor="filterSelect" className="fw-bold">
            Sort by:
          </label>
          <select
            id="filterSelect"
            className="form-select w-auto"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="">Default</option>
            <option value="likes_high_to_low">Most Liked</option>
            <option value="price_low_to_high">Price: Low to High</option>
            <option value="price_high_to_low">Price: High to Low</option>
          </select>
        </div>

        <div className="small-border bg-color-2 mt-4"></div>
      </div>

      {/* Explore component handles countdown + load more */}
      <Explore filter={selectedFilter} />
    </div>
  );
};

export default ExploreItems;