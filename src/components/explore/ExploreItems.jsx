import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import ItemCard from "../ItemCard";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newCountdowns = {};
      items.forEach((item, index) => {
        const diff = item.expiryDate - now;
        if (diff > 0) {
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          newCountdowns[index] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newCountdowns[index] = "Expired";
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        );
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [filter]);

  const handleLoadMore = (event) => {
    event.preventDefault();
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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
      <div className="row">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={index}
              style={{ display: "block", marginBottom: "20px" }}
            >
              <Skeleton width="100%" height="250px" borderRadius="8px" />
              <Skeleton
                width="80%"
                height="20px"
                borderRadius="4px"
                style={{ marginTop: "10px" }}
              />
              <Skeleton
                width="50%"
                height="20px"
                borderRadius="4px"
                style={{ marginTop: "10px" }}
              />
            </div>
          ))
        ) : (
          <ItemCard
            items={items.slice(0, visibleCount)}
            countdowns={countdowns}
          />
        )}
      </div>
      {visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
