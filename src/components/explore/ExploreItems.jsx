// ExploreItems.jsx

import React, { useEffect, useState } from "react";
import SkeletonLoader from "../UI/SkeletonLoader";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");

  const fetchItems = async () => {
    try {
      let apiUrl = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

      if (selectedFilter) {
        apiUrl += `?filter=${selectedFilter}`;
      }

      const { data } = await axios.get(apiUrl);
      setItems(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [selectedFilter]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          countdown: calculateCountdown(item.expiryDate),
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const calculateCountdown = (expiryDate) => {
    const now = new Date().getTime();
    const difference = expiryDate - now;

    if (difference < 0) {
      return "Expired";
    }

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const loadMore = () => {
    setLoading(true);
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
    setLoading(false);
  };

  const handleLoadMoreClick = () => {
    loadMore();
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <>
      <div>
        <select id="filter-items" value={selectedFilter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        Array.from({ length: visibleItems }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))
      ) : (
        items.slice(0, visibleItems).map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${items.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">{item.countdown}</div>

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
              <Link to={`/item-details/${item.id}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.id}`}>
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
        ))
      )}
      {items.length > visibleItems && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMoreClick} className="btn-main lead">
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
