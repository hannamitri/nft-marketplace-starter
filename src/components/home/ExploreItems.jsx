import React from "react";
import { Link } from "react-router-dom";
import { useExploreItems } from "../hooks/useExploreItems";
import CountdownTimer from "./CountdownTimer";

const ExploreItems = () => {
  const { items, loading, error, filterItems, loadMore, hasMore } = useExploreItems();

  const handleFilterChange = (e) => {
    filterItems(e.target.value);
  };

  if (loading) {
    return (
      <>
        <div>
          <select id="filter-items" defaultValue="" disabled>
            <option value="">Loading...</option>
          </select>
        </div>
        {new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover", opacity: 0.5 }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <div style={{ width: '50px', height: '50px', background: '#f0f0f0', borderRadius: '50%' }}></div>
              </div>
              <div className="de_countdown">Loading...</div>
              <div className="nft__item_wrap">
                <div style={{ width: '100%', height: '200px', background: '#f0f0f0' }}></div>
              </div>
              <div className="nft__item_info">
                <h4>Loading...</h4>
                <div className="nft__item_price">-</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>-</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (error) {
    return (
      <>
        <div>
          <select id="filter-items" defaultValue="" disabled>
            <option value="">Error</option>
          </select>
        </div>
        <div className="col-md-12 text-center" style={{ padding: '40px' }}>
          <p>Error loading items: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-main"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Filter Dropdown */}
      <div>
        <select 
          id="filter-items" 
          defaultValue=""
          onChange={handleFilterChange}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {/* Dynamic Items */}
      {items.map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            {/* Author Avatar */}
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt={`Author ${item.authorId}`} />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {/* Countdown Timer */}
            <div className="de_countdown">
              <CountdownTimer expiryDate={item.expiryDate} />
            </div>

            {/* NFT Item Wrap */}
            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* NFT Image - Routes to item details */}
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
              </Link>
            </div>

            {/* Item Info */}
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Load More Button */}
      {hasMore && (
        <div className="col-md-12 text-center">
          <Link to="" id="loadmore" className="btn-main lead" onClick={(e) => { e.preventDefault(); loadMore(); }}>
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;