import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchItems = async (selectedFilter = "") => {
    try {
      setLoading(true); 
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedFilter}`
      );
      const currentTime = Math.floor(Date.now() / 1000);

      const updatedItems = response.data.map((item) => ({
        ...item,
        countdown: item.expiryDate - currentTime,
      }));

      setTimeout(() => {
        setItems(updatedItems);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(filter);
  }, [filter]);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 4);
  };

  const formatCountdown = (seconds) => {
    if (seconds <= 0) return "Expired";

    const hours = Math.floor((seconds % (24 * 3600)) / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");

    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
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

      <div className="row">
        {/* Skeleton Loading */}
        {loading
          ? [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton circle={true} height={50} width={50} />
                  </div>
                  <div className="de_countdown">
                    <Skeleton width={100} height={20} />
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton height={150} />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width={`80%`} height={20} />
                    <div className="nft__item_price">
                      <Skeleton width={60} />
                    </div>
                    <div className="nft__item_like">
                      <Skeleton width={30} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : items.slice(0, visibleItems).map((item, index) => (
              <div
                key={item.id || index}
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy"
                        src={item.authorImage || AuthorImage}
                        alt="Author"
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">
                    {formatCountdown(item.countdown)}
                  </div>
                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage || nftImage}
                        className="lazy nft__item_preview"
                        alt="NFT"
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title || "Unnamed Item"}</h4>
                    </Link>
                    <div className="nft__item_price">
                      {item.price || "Not Available"} ETH
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {!loading && visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
