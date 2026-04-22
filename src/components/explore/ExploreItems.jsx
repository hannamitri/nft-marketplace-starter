import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useExploreItems } from "../../hooks/useExploreItems";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import ImageWithFallback from "../UI/ImageWithFallback";

const ExploreItems = () => {
  const { items, loading, error } = useExploreItems();
  const [sortBy, setSortBy] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const sortedItems = useMemo(() => {
    const next = [...items];
    if (sortBy === "price_low_to_high") {
      next.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_high_to_low") {
      next.sort((a, b) => b.price - a.price);
    } else if (sortBy === "likes_high_to_low") {
      next.sort((a, b) => b.likes - a.likes);
    }
    return next;
  }, [items, sortBy]);

  const visibleItems = sortedItems.slice(0, visibleCount);
  const hasMore = visibleCount < sortedItems.length;

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setVisibleCount(8);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading && <div className="col-12 text-center py-4">Loading items…</div>}
      {error && !loading && <div className="col-12 text-center py-4">{error}</div>}
      {!loading && !error && visibleItems.length === 0 && (
        <div className="col-12 text-center py-4">No items available.</div>
      )}
      {!loading && !error && visibleItems.map((item) => (
        <div
          key={item.nftId}
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
                <ImageWithFallback
                  className="lazy"
                  src={item.authorImage}
                  fallbackSrc={AuthorImage}
                  alt={item.authorName}
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">5h 30m 32s</div>

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="mailto:">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item.nftId}`}>
                <ImageWithFallback
                  src={item.nftImage}
                  fallbackSrc={nftImage}
                  className="lazy nft__item_preview"
                  alt={item.title}
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
      ))}
      {!loading && !error && hasMore && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            type="button"
            onClick={() => setVisibleCount((count) => count + 8)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
