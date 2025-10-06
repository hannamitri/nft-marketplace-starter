import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdowns, setCountdowns] = useState({});
  const [filter, setFilter] = useState("likes_high_to_low");
  const [displayedItems, setDisplayedItems] = useState(8);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        );
        setItems(response.data);
        setError(null);
        setDisplayedItems(8); // Reset to initial display count
        setHasMore(response.data.length > 8);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        setError(error.message || "Failed to load items");
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filter]);

  useEffect(() => {
    if (items.length === 0) return;

    const updateCountdowns = () => {
      const newCountdowns = {};
      items.forEach((item) => {
        const endTimeValue = item.endTime || item.end_time || item.auctionEnd || item.auction_end || item.expiresAt || item.expires_at;
        
        if (endTimeValue) {
          const now = new Date().getTime();
          let endTime;
          
          if (typeof endTimeValue === 'string') {
            endTime = new Date(endTimeValue).getTime();
          } else if (typeof endTimeValue === 'number') {
            endTime = endTimeValue;
          } else {
            newCountdowns[item.id] = "Invalid time";
            return;
          }
          
          const timeLeft = endTime - now;

          if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            newCountdowns[item.id] = `${hours}h ${minutes}m ${seconds}s`;
          } else {
            newCountdowns[item.id] = "Expired";
          }
        } else {
          // Generate mock countdown for items without end time
          const mockEndTime = new Date().getTime() + (Math.random() * 24 * 60 * 60 * 1000);
          const now = new Date().getTime();
          const timeLeft = mockEndTime - now;
          
          if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            newCountdowns[item.id] = `${hours}h ${minutes}m ${seconds}s`;
          } else {
            newCountdowns[item.id] = "Expired";
          }
        }
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [items]);

  const handleLoadMore = () => {
    const newDisplayedItems = displayedItems + 4;
    setDisplayedItems(newDisplayedItems);
    setHasMore(newDisplayedItems < items.length);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const SkeletonLoader = () => (
    <div className="row">
      {new Array(8).fill(0).map((_, index) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
          <div className="nft__item">
            <div className="author_list_pp">
              <Skeleton width="50px" height="50px" borderRadius="50%" />
            </div>
            <div className="de_countdown">
              <Skeleton width="80px" height="20px" borderRadius="4px" />
            </div>
            <div className="nft__item_wrap">
              <Skeleton width="100%" height="250px" borderRadius="8px" />
            </div>
            <div className="nft__item_info">
              <Skeleton width="120px" height="20px" borderRadius="4px" />
              <Skeleton width="80px" height="16px" borderRadius="4px" />
              <Skeleton width="40px" height="16px" borderRadius="4px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <>
        <div className="col-lg-12">
          <div className="items_filter">
            <select id="filter-items" value={filter} onChange={handleFilterChange}>
              <option value="">Default</option>
              <option value="price_low_to_high">Price, Low to High</option>
              <option value="price_high_to_low">Price, High to Low</option>
              <option value="likes_high_to_low">Most liked</option>
            </select>
          </div>
        </div>
        <SkeletonLoader />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="col-lg-12">
          <div className="items_filter">
            <select id="filter-items" value={filter} onChange={handleFilterChange}>
              <option value="">Default</option>
              <option value="price_low_to_high">Price, Low to High</option>
              <option value="price_high_to_low">Price, High to Low</option>
              <option value="likes_high_to_low">Most liked</option>
            </select>
          </div>
        </div>
        <div className="col-md-12 text-center" style={{ padding: "40px 0" }}>
          <div style={{ 
            background: "#f8f9fa", 
            padding: "20px", 
            borderRadius: "8px",
            border: "1px solid #e9ecef"
          }}>
            <i className="fa fa-exclamation-triangle" style={{ fontSize: "48px", color: "#6c757d", marginBottom: "16px" }}></i>
            <h4 style={{ color: "#6c757d", marginBottom: "8px" }}>Connection Issue</h4>
            <p style={{ color: "#6c757d", marginBottom: "16px" }}>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="col-lg-12" data-aos="fade-up">
        <div className="items_filter">
          <select id="filter-items" value={filter} onChange={handleFilterChange}>
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      </div>
      
      {items.slice(0, displayedItems).map((item, index) => (
        <div
          key={item.id || index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          data-aos="fade-up"
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId || item.author?.id || 'unknown'}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Creator: ${item.author?.name || 'Unknown'}`}
              >
                <img 
                  className="lazy" 
                  src={item.author?.avatar || item.authorImage || AuthorImage} 
                  alt={item.author?.name || 'Author'}
                  onError={(e) => {
                    e.target.src = AuthorImage;
                  }}
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">
              {countdowns[item.id] || "Loading..."}
            </div>

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
              <Link to={`/item-details/${item.nftId || item.id}`}>
                <img 
                  src={item.image || item.nftImage || nftImage} 
                  className="lazy nft__item_preview" 
                  alt={item.title || item.name || 'NFT'}
                  onError={(e) => {
                    e.target.src = nftImage;
                  }}
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId || item.id}`}>
                <h4>{item.title || item.name || 'Untitled'}</h4>
              </Link>
              <div className="nft__item_price">
                {item.price || item.ethPrice || '0'} ETH
              </div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes || item.likeCount || 0}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {hasMore && (
        <div className="col-md-12 text-center" data-aos="fade-up">
          <button 
            id="loadmore" 
            className="btn-main lead"
            onClick={handleLoadMore}
            style={{
              background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              boxShadow: "0 2px 10px rgba(102, 126, 234, 0.3)"
            }}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
