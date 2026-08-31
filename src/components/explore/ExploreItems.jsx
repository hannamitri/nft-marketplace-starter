import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [visibleCount, setVisibleCount] = useState(8);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        const url = selectedFilter
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedFilter}`
          : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

        const res = await fetch(url);
        const data = await res.json();

        setItems(Array.isArray(data) ? data : []);
        setVisibleCount(8);
        setHasMore(true);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedFilter]);

  useEffect(() => {
    if (!items.length) return;

    const updateCountdowns = () => {
      const updatedTimes = {};

      items.forEach((item) => {
        if (!item.expiryDate) {
          updatedTimes[item.id] = "Expired";
          return;
        }

        const endTime = Number(item.expiryDate);
        const now = Date.now();
        const diff = endTime - now;

        if (diff <= 0) {
          updatedTimes[item.id] = "Expired";
        } else {
          const totalSeconds = Math.floor(diff / 1000);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          updatedTimes[item.id] = `${hours}h ${minutes}m ${seconds}s`;
        }
      });

      setTimeLeft(updatedTimes);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, [items]);

  const handleLoadMore = (e) => {
    e.preventDefault();

    const newCount = visibleCount + 4;
    setVisibleCount(newCount);

    if (newCount >= items.length) {
      setHasMore(false);
    }
  };

  const goToItemDetails = (nftId) => {
    navigate(`/item-details/${nftId}`);
  };

  if (loading) {
    return (
      <>
        <div>
          <select
            id="filter-items"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>

        {new Array(8).fill(0).map((_, i) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
            <Skeleton />
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
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {items.slice(0, visibleCount).map((item, index) => (
        <div
          key={item.id || index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div
            className="nft__item"
            onClick={() => goToItemDetails(item.nftId)}
            style={{ cursor: "pointer" }}
          >
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  className="lazy"
                  src={item.authorImage || AuthorImage}
                  alt=""
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            <div className="de_countdown">
              {timeLeft[item.id] || "Loading..."}
            </div>

            <div className="nft__item_wrap">
              <img
                src={item.nftImage || nftImage}
                className="lazy nft__item_preview"
                alt={item.title}
              />
            </div>

            <div className="nft__item_info">
              <h4>{item.title}</h4>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {hasMore && (
  <div className="col-md-12 text-center">
    <button
      type="button"
      id="loadmore"
      className="btn-main lead"
      onClick={handleLoadMore}
    >
      Load more
    </button>
  </div>
)}
    </>
  );
};

export default ExploreItems;