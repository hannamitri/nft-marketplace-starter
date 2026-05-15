import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { enrichWithAuthorData, topSellersUrl } from "../../utils/authorUtils";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  
  const [exploreItems, setExploreItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    async function getNewItems() {
      try {
        const [exploreItemsResponse, sellersResponse] = await Promise.all([
          axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"),
          axios.get(topSellersUrl),
        ]);

        console.log("API data:", exploreItemsResponse.data);

        setExploreItems(enrichWithAuthorData(exploreItemsResponse.data, sellersResponse.data));
      } catch (error) {
        console.error("New items API error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getNewItems();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getCountdown(expiryDate) {
    const timeLeft = expiryDate - now;

    if (timeLeft <= 0) {
      return "00:00:00";
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return [hours, minutes, seconds]
      .map(time => String(time).padStart(2, "0"))
      .join(":");
  }

  const filteredItems = [...exploreItems].sort((a, b) => {
    if (filter === "price_low_to_high") {
      return a.price - b.price;
    }

    if (filter === "price_high_to_low") {
      return b.price - a.price;
    }

    if (filter === "likes_high_to_low") {
      return b.likes - a.likes;
    }

    return 0;
  });
  const visibleItems = filteredItems.slice(0, visibleCount);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={event => setFilter(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {error && <p>API error: {error}</p>}

      {loading && new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Skeleton width="50px" height="50px" borderRadius="50%" />
            </div>
            <div className="nft__item_wrap">
              <Skeleton width="100%" height="230px" borderRadius="8px" />
            </div>
            <div className="nft__item_info">
              <Skeleton width="70%" height="24px" borderRadius="4px" />
              <Skeleton width="45%" height="18px" borderRadius="4px" />
            </div>
          </div>
        </div>
      ))}

      {!loading && visibleItems.map(item => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId || item.id}`}
                state={{ author: item }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {item.expiryDate && (
              <div className="de_countdown">
                {getCountdown(item.expiryDate)}
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
              <Link to={`/item-details/${item.id}`} state={{ item }}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.id}`} state={{ item }}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price}</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {!loading && visibleCount < filteredItems.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleCount(visibleCount + 4)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
