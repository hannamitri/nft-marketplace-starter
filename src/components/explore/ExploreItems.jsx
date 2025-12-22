import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";
import axios from "axios";

const ExploreItems = ({ exploreData, loading }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(8);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [filterLoading, setFilterLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("");

  // Update current time every second for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update filtered data when exploreData changes
  useEffect(() => {
    setFilteredData(exploreData);
  }, [exploreData]);

  // Function to format countdown timer
  const formatCountdown = (expiryDate) => {
    if (!expiryDate) return null;

    const expiry = new Date(expiryDate).getTime();
    const timeDifference = expiry - currentTime;

    if (timeDifference <= 0) {
      return "Expired";
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  // Handle filter change with API calls
  const handleFilterChange = async (e) => {
    const filterValue = e.target.value;
    setCurrentFilter(filterValue);
    setFilterLoading(true);

    try {
      let apiUrl = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
      
      // Add filter parameter if not default
      if (filterValue && filterValue !== "") {
        apiUrl += `?filter=${filterValue}`;
      }

      const response = await axios.get(apiUrl);
      setFilteredData(response.data);
      setDisplayedItems(8); // Reset to show first 8 items
      setFilterLoading(false);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      // Fallback to original data if API call fails
      setFilteredData(exploreData);
      setFilterLoading(false);
    }
  };

  // Handle load more
  const handleLoadMore = () => {
    setDisplayedItems(prev => prev + 4);
  };

  // Show loading skeleton during initial load or filtering
  if (loading || filterLoading) {
    return (
      <>
        <div>
          <select 
            id="filter-items" 
            value={currentFilter} 
            onChange={handleFilterChange}
            disabled={loading}
          >
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
          {filterLoading && <span style={{ marginLeft: "10px" }}>Filtering...</span>}
        </div>
        {new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
              </div>
              <div className="de_countdown">
                <Skeleton width="80px" height="20px" borderRadius="4px" />
              </div>
              <div className="nft__item_wrap">
                <Skeleton width="100%" height="200px" borderRadius="8px" />
              </div>
              <div className="nft__item_info">
                <Skeleton width="80%" height="24px" borderRadius="4px" />
                <div style={{ marginTop: "8px" }}>
                  <Skeleton width="60%" height="20px" borderRadius="4px" />
                </div>
                <div style={{ marginTop: "8px" }}>
                  <Skeleton width="40px" height="16px" borderRadius="4px" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <div>
        <select 
          id="filter-items" 
          value={currentFilter} 
          onChange={handleFilterChange}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {filteredData.slice(0, displayedItems).map((item, index) => (
        <div
          key={item.id || index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId || item.id}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Creator: ${item.authorName || 'Unknown'}`}
              >
                <img 
                  className="lazy" 
                  src={item.authorImage || AuthorImage} 
                  alt={`${item.authorName}'s profile`} 
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            
            {/* Conditional countdown display */}
            {formatCountdown(item.expiryDate) && (
              <div className="de_countdown">
                {formatCountdown(item.expiryDate)}
              </div>
            )}

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
                <img 
                  src={item.nftImage || nftImage} 
                  className="lazy nft__item_preview" 
                  alt={item.title || 'NFT'} 
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title || 'Untitled'}</h4>
              </Link>
              <div className="nft__item_price">{item.price || '0'} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes || 0}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Load More Button - only show if there are more items to load */}
      {displayedItems < filteredData.length && (
        <div className="col-md-12 text-center">
          <button 
            onClick={handleLoadMore}
            id="loadmore" 
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;