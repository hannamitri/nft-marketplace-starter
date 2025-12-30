import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftItem from "../UI/NftItem";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [countdowns, setCountdowns] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        setLoading(true);
        const url = filter
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
          : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        const response = await axios.get(url);
        setExploreItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filter]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      exploreItems.forEach((item) => {
        const now = Date.now();
        const timeLeft = item.expiryDate - now;

        if (timeLeft > 0) {
          const hours = Math.floor(timeLeft / (1000 * 60 * 60));
          const minutes = Math.floor(
            (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          newCountdowns[item.nftId] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newCountdowns[item.nftId] = "Expired";
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [exploreItems]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setVisibleCount(8);
  };

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
      {loading
        ? new Array(8).fill(0).map((_, index) => (
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
                  <Skeleton width="100%" height="250px" borderRadius="8px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="120px" height="20px" borderRadius="4px" />
                  <Skeleton width="80px" height="16px" borderRadius="4px" />
                </div>
              </div>
            </div>
          ))
        : exploreItems.slice(0, visibleCount).map((item) => (
            <div
              key={item.nftId}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftItem item={item} countdown={countdowns[item.nftId]} />
            </div>
          ))}
      {!loading && visibleCount < exploreItems.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={(e) => {
              e.preventDefault();
              handleLoadMore();
            }}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
