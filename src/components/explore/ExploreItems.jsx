import React, { useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import NftCardSkeleton from "../UI/NftCardSkeleton";

const ExploreItems = ({ exploreItems, loading, filter, setFilter }) => {
  const [visibleItems, setVisibleItems] = useState(8);

  return (
    <>
      <div className="col-12">
        <select id="filter-items" defaultValue={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        <>
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{
                display: "block",
                backgroundSize: "cover",
              }}
            >
              <NftCardSkeleton showAvatar showCountdown showLikes />
            </div>
          ))}
        </>
      ) : (
        exploreItems.slice(0, visibleItems).map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              <Countdown expiryDate={item.expiryDate} />

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>

                    <div className="nft__item_share">
                      <h4>Share</h4>

                      <button type="button" aria-label="Share on Facebook">
                        <i className="fa fa-facebook fa-lg"></i>
                      </button>

                      <button type="button" aria-label="Share on Twitter">
                        <i className="fa fa-twitter fa-lg"></i>
                      </button>

                      <button type="button" aria-label="Share via Email">
                        <i className="fa fa-envelope fa-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>

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
        ))
      )}

      <div className="col-md-12 text-center">
        {!loading && visibleItems < exploreItems.length && (
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleItems(visibleItems + 4)}
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
