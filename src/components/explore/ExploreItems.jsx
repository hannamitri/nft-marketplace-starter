import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExploreItems = () => {
  const apiUrl =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

  const [exploreItem, setExploreItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});
  const [displayCount, setDisplayCount] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchExplore() {
      try {
        const url = filter ? `${apiUrl}?filter=${filter}` : apiUrl;

        const response = await axios.get(url);
        const { data } = response;

        setExploreItem(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExplore();
  }, [filter]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdowns = exploreItem.reduce((acc, item) => {
        acc[item.nftId] = calculateTimeLeft(item.expiryDate);
        return acc;
      }, {});
      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [exploreItem]);

  const calculateTimeLeft = (expiryDate) => {
    const difference = expiryDate - Date.now();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const loadMoreItems = () => {
    setDisplayCount((prevCount) => prevCount + 4);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setDisplayCount(8);
  };

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
      {isLoading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item skeleton__explore-items">
                <div className="author_list_pp skeleton-avatar__explore-items"></div>
                <div className="skeleton-img__explore-items"></div>
                <div className="nft__item_info">
                  <div className="skeleton-text__explore-items title__explore-items"></div>
                  <div className="skeleton-text__explore-items price__explore-items"></div>
                  <div className="skeleton-text__explore-items likes__explore-items"></div>
                </div>
              </div>
            </div>
          ))
        : exploreItem.slice(0, displayCount).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && (
                  <div className="de_countdown">
                    {countdowns[item.nftId]?.hours}h{" "}
                    {countdowns[item.nftId]?.minutes}m{" "}
                    {countdowns[item.nftId]?.seconds}s
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
      <div className="col-md-12 text-center">
        {displayCount < exploreItem.length && (
          <button
            onClick={loadMoreItems}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
