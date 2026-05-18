import React from "react";

const HeaderExplore = () => {
  return (
    <div className="col-lg-12">
      <div className="items_filter">
        <form
          action="blank.php"
          className="row form-dark"
          id="form_quick_search"
          method="post"
          name="form_quick_search"
        >
          {/* FROM MAIN!!! DO NOT REMOVE */}
          <div className="col text-center">
            <input
              className="form-control"
              id="name_1"
              name="name_1"
              placeholder="search item here..."
              type="text"
            />{" "}
            <button type="button" id="btn-submit" aria-label="Search">
              <i className="fa fa-search bg-color-secondary"></i>
            </button>
            <div className="clearfix"></div>
          </div>
        </form>

        <div id="item_category" className="dropdown">
          <button type="button" className="btn-selector">
            All categories
          </button>
          <ul>
            <li className="active">
              <span>All categories</span>
            </li>
            <li>
              <span>Art</span>
            </li>
            <li>
              <span>Music</span>
            </li>
            <li>
              <span>Domain Names</span>
            </li>
            <li>
              <span>Virtual World</span>
            </li>
            <li>
              <span>Trading Cards</span>
            </li>
            <li>
              <span>Collectibles</span>
            </li>
            <li>
              <span>Sports</span>
            </li>
            <li>
              <span>Utility</span>
            </li>
          </ul>
        </div>

        <div id="buy_category" className="dropdown">
          <button type="button" className="btn-selector">
            Buy Now
          </button>
          <ul>
            <li className="active">
              <span>Buy Now</span>
            </li>
            <li>
              <span>On Auction</span>
            </li>
            <li>
              <span>Has Offers</span>
            </li>
          </ul>
        </div>

        <div id="items_type" className="dropdown">
          <button type="button" className="btn-selector">
            All Items
          </button>
          <ul>
            <li className="active">
              <span>All Items</span>
            </li>
            <li>
              <span>Single Items</span>
            </li>
            <li>
              <span>Bundles</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderExplore;
