import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../UI/CountdownTimer";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch explore items.");
        }

        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, []);

  const sortedItems = useMemo(() => {
    const sorted = [...items];

    if (sortBy === "price_low_to_high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_high_to_low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "likes_high_to_low") {
      sorted.sort((a, b) => b.likes - a.likes);
    }

    return sorted;
  }, [items, sortBy]);

  const visibleItems = sortedItems.slice(0, visibleCount);

  const handleLoadMore = (event) => {
    event.preventDefault();
    setVisibleCount((count) => count + 4);
  };

  const hasMore = visibleCount < sortedItems.length;

  return (
    <>
      <div data-aos="fade-down" data-aos-delay="60">
        <select
          id="filter-items"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading && Array.from({ length: 8 }).map((_, index) => (
        <div
          key={`explore-skeleton-${index}`}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Skeleton width="50px" height="50px" borderRadius="50%" />
            </div>
            <div className="de_countdown">
              <Skeleton width="100px" height="18px" borderRadius="4px" />
            </div>
            <div className="nft__item_wrap">
              <Skeleton width="100%" height="260px" borderRadius="8px" />
            </div>
            <div className="nft__item_info">
              <Skeleton width="70%" height="20px" borderRadius="4px" />
              <div className="mt-2">
                <Skeleton width="45%" height="16px" borderRadius="4px" />
              </div>
            </div>
          </div>
        </div>
      ))}
      {!loading && error && (
        <div className="col-md-12 text-center text-danger">{error}</div>
      )}
      {!loading && !error && visibleItems.map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          data-aos={isMobile ? "fade-up" : (item.likes > 200 ? "flip-left" : "fade-up")}
          data-aos-delay={isMobile ? (item.id % 3) * 30 : ((item.id % 8) + 1) * 45}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Creator ID: ${item.authorId}`}
              >
                <img className="lazy" src={item.authorImage} alt={item.title?.trim() || "Author"} />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <CountdownTimer expiryDate={item.expiryDate} />

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
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title?.trim() || "NFT item"} />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title?.trim()}</h4>
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
        <div className="col-md-12 text-center" data-aos="zoom-in" data-aos-delay="100">
          <Link to="" id="loadmore" className="btn-main lead" onClick={handleLoadMore}>
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
