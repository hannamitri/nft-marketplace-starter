import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";


const CountdownTimer = ({expiryDate}) => {
  const [timeLeft, setTimeLeft] = useState("");


 useEffect(() => {
    if (!expiryDate) return;

    function calculateTime() {
      const now = Date.now();
      const distance = expiryDate - now;

      if (distance <= 0) {
        setTimeLeft("EXPIRED");
        return;
      }

      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");

      setTimeLeft(`${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`);
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate) return null;

  return <div className="de_countdown">{timeLeft}</div>;
};

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8); // Initially display 8 items
  const [filter, setFilter] = useState(""); // Filter state for dropdown

  // Fetch items from the API with filter parameter
  async function fetchExploreItems(filterValue = "") {
    setLoading(true);
    try {
      const url = filterValue
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
        : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

      const { data } = await axios.get(url);
      setItems(data);
    } catch (error) {
      console.error("Error fetching explore items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExploreItems();
  }, []);

  // Handle filter selection changes
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    fetchExploreItems(selectedFilter);
  };

  // Increase visible cards by 4 on click
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <section id="section-explore" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Explore Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="col-md-12 mb-4 d-flex justify-content-end">
            <select
              id="filter-items"
              value={filter}
              onChange={handleFilterChange}
              className="form-select w-auto"
            >
              <option value="">Default</option>
              <option value="price_low_to_high">Price, Low to High</option>
              <option value="price_high_to_low">Price, High to Low</option>
              <option value="likes_high_to_low">Most Liked</option>
            </select>
          </div>

          {/* Items / Skeleton Grid */}
          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-12 mb-4"
                  key={index}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="220px" borderRadius="8px" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="nft_coll_info text-center mt-3">
                      <Skeleton width="120px" height="20px" className="mb-2" />
                      <Skeleton width="60px" height="16px" />
                    </div>
                  </div>
                </div>
              ))
            : items.slice(0, visibleCount).map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-12 mb-4"
                  key={item.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.authorId}`}
                      >
                        <img
                          className="lazy"
                        src={item.authorImage}
                          alt={item.title}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {/* Countdown Overlay */}
                    <CountdownTimer expiryDate={item.expiryDate} />

                    <div className="nft__item_wrap">
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
              ))}

          {/* Load More Button */}
          {!loading && visibleCount < items.length && (
            <div className="col-md-12 text-center mt-3">
              <button
                onClick={handleLoadMore}
                id="loadmore"
                className="btn-main lead"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExploreItems;
    
