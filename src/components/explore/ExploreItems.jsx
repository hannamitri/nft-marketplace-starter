import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";
import exploreItemData from "../../api/exploreApi.json";

const ExploreItemSkeleton = () => (
  <div className="nft__item">
    <div className="author_list_pp" style={{ position: "relative" }}>
      <Skeleton
        type="avatar"
        width="50px"
        height="50px"
        borderRadius="50%"
        style={{ margin: "0 auto" }}
      />
    </div>

    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
      <Skeleton type="timer" width="120px" height="25px" />
    </div>

    <div className="nft__item_wrap">
      <Skeleton
        type="image"
        height="230px"
        style={{ marginTop: "20px", borderRadius: "8px" }}
      />
    </div>

    <div className="nft__item_info" style={{ padding: "10px 0" }}>
      <Skeleton
        type="title"
        style={{ marginTop: "10px", marginBottom: "8px" }}
      />
      <Skeleton type="price" style={{ marginBottom: "8px" }} />
      <Skeleton type="subtitle" width="80px" />
    </div>
  </div>
);

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [filter, setFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    console.log("ExploreItems component mounted, setting loading state to:", true);
    const initialTime = new Date().getTime();
    setStartTime(initialTime)
    setLoading(true);
    
    const timer = setTimeout(() => {
      setItems(exploreItemData);
      setFilteredItems(exploreItemData);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      let result = [...items];

      if (filter === "price_low_to_high") {
        result = result.sort((a, b) => a.price - b.price);
      } else if (filter === "price_high_to_low") {
        result = result.sort((a, b) => b.price - a.price);
      } else if (filter === "likes_high_to_low") {
        result = result.sort((a, b) => b.likes - a.likes);
      }

      setFilteredItems(result);
    }
  }, [filter, items]);

  const formatRemainingTime = (expiryDateStr) => {
    if (!expiryDateStr) {
      return null;
    }

    const expiryTimestamp = parseInt(expiryDateStr);

    if (isNaN(expiryTimestamp)) {
      return null;
    }

    const elapsedSinceStart = currentTime - startTime;
    const timeRemaining = expiryTimestamp - elapsedSinceStart;

    if (timeRemaining <= 0) {
      return null;
    }

    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setVisibleItems(8);
  };

  const loadMoreItems = () => {
    setVisibleItems((prevVisible) => prevVisible + 4);
  };

  const renderSkeletonItems = () => {
    console.log("Rendering skeleton items, loading:", loading);
    return Array(8)
      .fill(0)
      .map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block" }} 
        >
          <ExploreItemSkeleton />
        </div>
      ));
  };

  const displayedItems = filteredItems.slice(0, visibleItems);
  const hasMoreItems = visibleItems < filteredItems.length;

  console.log("ExploreItems render - loading state:", loading);

  return (
    <>
      <div className="row mb-4">
        <div className="col-12">
          <div className="items_filter">
            <select
              id="filter-items"
              className="form-control"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="">Default</option>
              <option value="price_low_to_high">Price, Low to High</option>
              <option value="price_high_to_low">Price, High to Low</option>
              <option value="likes_high_to_low">Most liked</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        {loading
          ? renderSkeletonItems()
          : displayedItems.map((item) => (
              <div
                key={item.id}
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
                      <img
                        className="lazy"
                        src={item.authorImage || AuthorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  {formatRemainingTime(item.expiryDate) && (
                    <div className="de_countdown">
                      {formatRemainingTime(item.expiryDate)}
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
                    <Link to={`/item-details/${item.id}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
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
            ))}
      </div>

      {hasMoreItems && (
        <div className="row">
          <div className="col-md-12 text-center">
            <button
              onClick={loadMoreItems}
              id="loadmore"
              className="btn-main lead"
            >
              Load more
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
