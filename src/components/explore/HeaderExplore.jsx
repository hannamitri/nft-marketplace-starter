import React, { useState } from "react";

const HeaderExplore = ({
  onSearch,
  onCategoryChange,
  onBuyTypeChange,
  onItemTypeChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="col-lg-12">
      <div className="items_filter">

        {/* SEARCH BAR */}
        <form className="row form-dark" onSubmit={handleSearchSubmit}>
          <div className="col text-center">
            <input
              className="form-control"
              placeholder="search item here..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button type="submit" id="btn-submit">
              <i className="fa fa-search bg-color-secondary"></i>
            </button>

            <div className="clearfix"></div>
          </div>
        </form>

        {/* CATEGORY DROPDOWN */}
        <div id="item_category" className="dropdown">
          <button className="btn-selector">All categories</button>
          <ul>
            {[
              "All categories",
              "Art",
              "Music",
              "Domain Names",
              "Virtual World",
              "Trading Cards",
              "Collectibles",
              "Sports",
              "Utility",
            ].map((cat) => (
              <li key={cat} onClick={() => onCategoryChange(cat)}>
                <span>{cat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* BUY TYPE DROPDOWN */}
        <div id="buy_category" className="dropdown">
          <button className="btn-selector">Buy Type</button>
          <ul>
            {["Buy Now", "On Auction", "Has Offers"].map((type) => (
              <li key={type} onClick={() => onBuyTypeChange(type)}>
                <span>{type}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ITEM TYPE DROPDOWN */}
        <div id="items_type" className="dropdown">
          <button className="btn-selector">All Items</button>
          <ul>
            {["All Items", "Single Items", "Bundles"].map((type) => (
              <li key={type} onClick={() => onItemTypeChange(type)}>
                <span>{type}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default HeaderExplore;