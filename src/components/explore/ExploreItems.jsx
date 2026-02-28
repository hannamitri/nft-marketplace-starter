import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTimeLeft } from "../../utils/time.js";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [tick, setTick] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    setIsLoading(true);

    const url = selectedFilter
      ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedFilter}`
      : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : data.data);
        setVisibleCount(8);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("explore api error:", err);
        setIsLoading(false);
      });
  }, [selectedFilter]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const handleLoadMore = (e) => {
    e.preventDefault();
    setVisibleCount((prev) => {
      const nextCount = prev + 4;
      return nextCount > items.length ? items.length : nextCount;
    });
  };

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <Skeleton width="100%" height="350px" borderRadius="12px" />
            </div>
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
          key={item.id ?? index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {tick && getTimeLeft(item.expiryDate) !== "0h 0m 0s" && (
              <div className="de_countdown">{getTimeLeft(item.expiryDate)}</div>
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

              <Link to="/item-details">
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to="/item-details">
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

      {!isLoading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <Link
            to="#"
            onClick={handleLoadMore}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
