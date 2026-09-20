import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import { API_URLS } from "../../api/nftApi";
import useApiList from "../../hooks/useApiList";
import { NftGridSkeleton } from "../UI/LoadingSkeletons";
const INITIAL_ITEMS = 8;
const LOAD_MORE_COUNT = 4;

const ExploreItems = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUrl = sortBy
    ? `${API_URLS.explore}?filter=${encodeURIComponent(sortBy)}`
    : API_URLS.explore;
  const { data: items, loading, error } = useApiList(
    filteredUrl,
    "Unable to load Explore items. Please try again later."
  );
  const matchingItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return items;

    return items.filter((item) =>
      item.title.toLowerCase().includes(normalizedSearch)
    );
  }, [items, searchTerm]);
  const visibleItems = matchingItems.slice(0, visibleCount);

  return (
    <>
      <div className="col-12 explore-controls">
        <form
          className="form-dark explore-search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="explore-search">
            Search Explore items
          </label>
          <input
            className="form-control"
            id="explore-search"
            type="search"
            value={searchTerm}
            placeholder="Search items..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setVisibleCount(INITIAL_ITEMS);
            }}
          />
          <i className="fa fa-search" aria-hidden="true"></i>
        </form>
        <select
          id="filter-items"
          value={sortBy}
          onChange={(event) => {
            setSortBy(event.target.value);
            setVisibleCount(INITIAL_ITEMS);
          }}
          aria-label="Sort Explore items"
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading && <NftGridSkeleton count={8} label="Loading Explore items" />}
      {error && <p className="col-12" role="alert">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="col-12">No Explore items available.</p>
      )}
      {!loading && !error && items.length > 0 && matchingItems.length === 0 && (
        <p className="col-12">No items match your search.</p>
      )}
      {!loading && !error && visibleItems.map((item) => (
        <div key={item.id} className="d-item explore-item col-md-3 col-sm-6 col-xs-12">
          <div className="nft__item explore-item-card">
            <div className="author_list_pp">
              <Link to={`/${item.authorId}/author`} title={`View creator of ${item.title}`}>
                <img className="lazy" src={item.authorImage} alt={`Creator of ${item.title}`} />
                <i className="fa fa-check" aria-hidden="true"></i>
              </Link>
            </div>
            <Countdown expiryDate={item.expiryDate} />
            <div className="nft__item_wrap">
              <Link to={`/explore/item/${item.id}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/explore/item/${item.id}`}><h4>{item.title}</h4></Link>
              <div className="nft__item_price">{Number(item.price).toFixed(2)} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart" aria-hidden="true"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {!loading && !error && visibleCount < matchingItems.length && (
        <div className="col-md-12 text-center">
          <button
            type="button"
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
