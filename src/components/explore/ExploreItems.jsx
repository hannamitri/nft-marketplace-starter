import React, { useState, useEffect } from "react";
 gibson-explore-items
import { Link } from "react-router-dom";

import { Link, useSearchParams } from "react-router-dom";
 main
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
 gibson-explore-items
  const [visibleItems, setVisibleItems] = useState(8);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        setLoading(true);
        let apiUrl = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        
        // Use server-side filtering when available
        if (filter) {
          apiUrl += `?filter=${filter}`;
        }
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setExploreItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        // Fallback data
        setExploreItems([
          {
            id: 1,
            title: "Pinky Ocean",
            price: 5.07,
            likes: 69,
            authorId: 83937449,
            nftId: 10147817,
            expiryDate: 1757694560799,
            nftImage: null,
            authorImage: null
          }
        ]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const fetchExploreItems = async (filterParam = '') => {
      try {
        setLoading(true);
        let url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore';
        if (filterParam) {
          url += `?filter=${filterParam}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setExploreItems(data);
      } catch (error) {
        console.error('Error fetching explore items:', error);
      } finally {
 main
        setLoading(false);
      }
    };

gibson-explore-items
    fetchExploreItems();
  }, [filter]);

  // Update current time every second for live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime());

    // Check for filter parameter in URL
    const urlFilter = searchParams.get('filter');
    if (urlFilter) {
      setFilter(urlFilter);
      fetchExploreItems(urlFilter);
    } else {
      fetchExploreItems();
    }
  }, [searchParams]);

  // Update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
 main
    }, 1000);

    return () => clearInterval(timer);
  }, []);

gibson-explore-items

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    
    // Update URL parameters
    if (selectedFilter) {
      setSearchParams({ filter: selectedFilter });
    } else {
      setSearchParams({});
    }
  };

 main
  const formatTimeLeft = (expiryDate) => {
    const timeLeft = expiryDate - currentTime;
    
    if (timeLeft <= 0) {
      return "Expired";
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    if (days > 0) {
gibson-explore-items
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setVisibleItems(8); // Reset visible items when filter changes
  };

  const getSortedItems = () => {
    // Since we're now using server-side filtering, we don't need client-side sorting
    // The API already returns sorted data when a filter is applied
    return exploreItems;
  };

  const loadMore = () => {
    setVisibleItems(prev => prev + 4);

      return `${days}d ${hours}h ${minutes}m`;
    } else {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
main
  };

  if (loading) {
    return (
      <>
 gibson-explore-items
        <div>
          <select id="filter-items" defaultValue="">
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>

 main
        <div className="col-md-12 text-center">
          <p>Loading explore items...</p>
        </div>
      </>
    );
  }

gibson-explore-items
  const sortedItems = getSortedItems();
  const itemsToShow = sortedItems.slice(0, visibleItems);


 main
  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
 gibson-explore-items
      {itemsToShow.map((item, index) => (
        <div
          key={item.id}

      {exploreItems.map((item, index) => (
        <div
          key={item.id || index}
main
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Creator: ${item.authorId}`}
              >
 gibson-explore-items
                <img 
                  className="lazy" 
                  src={item.authorImage || AuthorImage} 
                  alt="Author" 
                />

                <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
 main
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">{formatTimeLeft(item.expiryDate)}</div>

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
 gibson-explore-items
                <img 
                  src={item.nftImage || nftImage} 
                  className="lazy nft__item_preview" 
                  alt={item.title} 
                />
                <img src={item.nftImage || nftImage} className="lazy nft__item_preview" alt={item.title} />
 main
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
      {visibleItems < sortedItems.length && (
        <div className="col-md-12 text-center">
          <button 
            onClick={loadMore} 
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
