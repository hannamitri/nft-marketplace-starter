import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../author/Countdown";
import Skeleton from "../UI/Skeleton";
import { EXPLORE_URL } from "../home/marketplaceApi";

const INITIAL_COUNT = 8;
const PAGE_SIZE = 4;

const ExploreItems = () => {
  const [result, setResult] = useState({ sort: "", status: "loading", items: [] });
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [sort, setSort] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const loadItems = async () => {
      try {
        const apiSort = sort === "likes_low_to_high" ? "likes_high_to_low" : sort;
        const url = apiSort
          ? `${EXPLORE_URL}?${new URLSearchParams({ filter: apiSort })}`
          : EXPLORE_URL;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`Explore request failed (${response.status})`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Explore response was not a list");
        if (!controller.signal.aborted) {
          setResult({
            sort,
            status: "success",
            items: sort === "likes_low_to_high" ? [...data].reverse() : data,
          });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to load explore items:", error);
          setResult({ sort, status: "error", items: [] });
        }
      }
    };
    loadItems();
    return () => controller.abort();
  }, [sort]);

  const status = result.sort === sort ? result.status : "loading";
  const items = result.sort === sort ? result.items : [];

  return (
    <>
      <div className="col-12">
        <label className="visually-hidden" htmlFor="filter-items">Sort NFTs</label>
        <select id="filter-items" value={sort} onChange={(event) => {
          const nextSort = event.target.value;
          if (nextSort === sort) return;
          setResult({ sort: nextSort, status: "loading", items: [] });
          setSort(nextSort);
          setVisibleCount(INITIAL_COUNT);
        }}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_low_to_high">Likes, Low to High</option>
          <option value="likes_high_to_low">Likes, High to Low</option>
        </select>
      </div>
      {status === "loading" && (
        <div className="col-12" role="status">
          <span className="visually-hidden">Loading NFTs...</span>
          <div className="row" aria-hidden="true">
            {Array.from({ length: INITIAL_COUNT }, (_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={index}>
                <div className="nft__item explore-skeleton">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <Skeleton width="100%" height="250px" borderRadius="8px" />
                  <Skeleton width="70%" height="20px" borderRadius="4px" />
                  <Skeleton width="40%" height="16px" borderRadius="4px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {status === "error" && <div className="col-12" role="alert">NFTs could not be loaded.</div>}
      {status === "success" && items.length === 0 && <p className="col-12">No NFTs found.</p>}
      {status === "success" && items.slice(0, visibleCount).map((item) => (
        <div key={item.id} className="col-lg-3 col-md-6 col-sm-6 col-12" data-aos="fade-up">
          <div className="nft__item explore-item">
            <div className="author_list_pp">
              <Link to={`/author/${item.authorId}`}>
                <img src={item.authorImage} alt={`${item.title} creator`} />
                <i className="fa fa-check" aria-hidden="true"></i>
              </Link>
            </div>
            <div className="nft__item_wrap">
              <Link to={`/item-details/nft/${encodeURIComponent(item.nftId)}`}>
                <img src={item.nftImage} className="nft__item_preview" alt={item.title} />
              </Link>
              {typeof item.expiryDate === "number" && Number.isFinite(item.expiryDate) && (
                <Countdown expiresAt={item.expiryDate} className="explore-item__countdown" />
              )}
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/nft/${encodeURIComponent(item.nftId)}`}><h4>{item.title}</h4></Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                <span aria-label={`${item.likes} likes`}>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {status === "success" && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button type="button" id="loadmore" className="btn-main lead" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
            Show more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
