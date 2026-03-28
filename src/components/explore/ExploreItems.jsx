import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import { useExploreItems } from "../../hooks/useExploreItems";

const useCountdown = (expiryDate) => {
  const calculateTimeLeft = useCallback(() => {
    const diff = new Date(expiryDate) - new Date();
    if (diff <= 0) return "Expired";
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    return `${h}h ${m}m ${s}s`;
  }, [expiryDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
};

const ExploreCard = ({ item }) => {
  const timeLeft = useCountdown(item.expiryDate);
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link to={`/author/${item.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top" title={`Creator: ${item.authorName}`}>
          <img className="lazy" src={item.authorImage} alt={item.authorName} />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {item.expiryDate && <div className="de_countdown">{timeLeft}</div>}
      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i className="fa fa-facebook fa-lg"></i></a>
              <a href="https://www.twitter.com" target="_blank" rel="noreferrer"><i className="fa fa-twitter fa-lg"></i></a>
              <button type="button" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}><i className="fa fa-envelope fa-lg"></i></button>
            </div>
          </div>
        </div>
        <Link to={`/item-details/${item.nftId}`}>
          <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.nftId}`}><h4>{item.title}</h4></Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );
};

const ExploreItems = () => {
  const { items, loading, error, filterItems, loadMore, hasMore } = useExploreItems();

  // Refresh AOS whenever items change so dynamically rendered cards animate in
  useEffect(() => {
    const timer = setTimeout(() => AOS.refresh(), 50);
    return () => clearTimeout(timer);
  }, [items]);

  const handleFilterChange = (e) => {
    filterItems(e.target.value);
  };

  if (loading) {
    return (
      <>
        <div>
          <select id="filter-items" defaultValue="" disabled>
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
        {new Array(8).fill(0).map((_, index) => (
          <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", backgroundSize: "cover" }}>
            <div className="nft__item">
              <div className="author_list_pp">
                <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
              </div>
              <div className="nft__item_wrap">
                <div style={{ width: "100%", height: "200px", borderRadius: "8px", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
              </div>
              <div className="nft__item_info">
                <div style={{ width: "120px", height: "16px", borderRadius: "4px", marginBottom: "8px", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
                <div style={{ width: "80px", height: "14px", borderRadius: "4px", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
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
            <option value="">Default</option>
          </select>
        </div>
        <div className="col-md-12 text-center" style={{ padding: "60px 0" }}>
          <p>Error: {error}</p>
          <button className="btn-main" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <div>
          <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
        <div className="col-md-12 text-center" style={{ padding: "60px 0" }}>
          <p>No items available.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {items.map((item, index) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          data-aos="fade-up"
          data-aos-delay={index % 4 * 100}
        >
          <ExploreCard item={item} />
        </div>
      ))}

      {hasMore && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={(e) => { e.preventDefault(); loadMore(); }}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;