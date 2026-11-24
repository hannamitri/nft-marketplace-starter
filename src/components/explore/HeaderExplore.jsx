import React from "react";

const HeaderExplore = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="col-lg-12">
      <div className="items_filter row align-items-center">
        <form
          className="col-md-8 form-dark"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <div>
            <input
              className="form-control"
              id="explore-search"
              name="explore-search"
              placeholder="Search items..."
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              aria-label="Search items"
            />
          </div>
        </form>
        <div className="col-md-4">
          <select
            id="filter-items"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            aria-label="Sort items"
          >
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HeaderExplore;
