import React, { useState, useEffect } from "react";
import NFTCard from "../UI/NFTCard";
import Toast from "../UI/Toast";

const ExploreItems = () => {
  const [nftItems, setNftItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('default');
  const [displayedCount, setDisplayedCount] = useState(8);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch data based on filter
  const fetchNFTItems = async (filterValue) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = filterValue === 'default' 
        ? 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore'
        : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch NFT items');
      }
      
      const data = await response.json();
      setNftItems(data);
      
      // Maintain current display count when switching filters
      // Don't reset displayedCount - user keeps their current view
      
    } catch (err) {
      setError(err.message);
      setToastMessage('Filter failed. Please try again.');
      setShowToast(true);
      console.error('Error fetching NFT items:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchNFTItems(filter);
  }, []);

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    fetchNFTItems(newFilter);
  };

  // Handle load more
  const handleLoadMore = () => {
    const newCount = Math.min(displayedCount + 4, nftItems.length);
    setDisplayedCount(newCount);
  };

  // Close toast
  const closeToast = () => {
    setShowToast(false);
    setToastMessage('');
  };

  return (
    <>
      {/* Filter Dropdown */}
      <div>
        <select 
          id="filter-items" 
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {/* NFT Items Grid */}
      <div className="row">
        {loading ? (
          // Show skeleton loading for current display count
          Array.from({ length: displayedCount }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="d-item col-lg-3 col-md-4 col-sm-6 col-xs-12"
              style={{ display: "block" }}
            >
              <NFTCard loading={true} />
            </div>
          ))
        ) : (
          // Show actual NFT items
          nftItems.slice(0, displayedCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-4 col-sm-6 col-xs-12"
              style={{ display: "block" }}
            >
              <NFTCard nftData={item} loading={false} />
            </div>
          ))
        )}
      </div>

      {/* Load More Button - only show if there are more items */}
      {displayedCount < nftItems.length && (
        <div className="col-md-12 text-center">
          <button 
            onClick={handleLoadMore} 
            id="loadmore" 
            className="btn-main lead"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}

      {/* Toast Notification */}
      <Toast 
        message={toastMessage}
        type="error"
        show={showToast}
        onClose={closeToast}
      />
    </>
  );
};

export default ExploreItems;
