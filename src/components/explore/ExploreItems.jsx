import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SkeletonBox,
  SkeletonCircle,
  SkeletonText,
} from "../Skeleton/Skeleton";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate));

  function calculateTimeLeft(expiryDate) {
    const difference = +new Date(expiryDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiryDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  const format = (num) => String(num).padStart(2, "0");

  if (timeLeft.hours === undefined) return null;

  return (
    <div className="de_countdown">
      {format(timeLeft.hours)}h {format(timeLeft.minutes)}m{" "}
      {format(timeLeft.seconds)}s
    </div>
  );
};

const ExploreSkeleton = ({ count = 8 }) => (
  <>
    <div>
      <select id="filter-items" defaultValue="" disabled>
        <option value="">Default</option>
        <option value="price_low_to_high">Price, Low to High</option>
        <option value="price_high_to_low">Price, High to Low</option>
        <option value="likes_high_to_low">Most liked</option>
      </select>
    </div>
    {Array.from({ length: count }).map((_, index) => (
      <div
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        key={index}
        style={{ display: "block", backgroundSize: "cover" }}
      >
        <div className="nft__item">
          <div className="author_list_pp">
            <SkeletonCircle style={{ width: "50px", height: "50px" }} />
          </div>
          <SkeletonBox
            className="de_countdown"
            style={{ width: "100px", height: "24px" }}
          />
          <div className="nft__item_wrap">
            <SkeletonBox style={{ height: "200px", width: "100%" }} />
          </div>
          <div className="nft__item_info">
            <SkeletonText
              style={{ width: "60%", height: "20px", marginBottom: "8px" }}
            />
            <SkeletonText style={{ width: "40%", height: "16px" }} />
          </div>
        </div>
      </div>
    ))}
  </>
);

const ExploreItems = ({
  items,
  loading,
  onFilter,
  onLoadMore,
  showLoadMore,
}) => {
  const handleFilterChange = (e) => {
    onFilter(e.target.value);
  };

  if (loading) {
    return <ExploreSkeleton count={8} />;
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

      {items.map((item) => (
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
                title={item.authorName}
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

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
                  alt={item.title}
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

      {showLoadMore && (
        <div className="col-md-12 text-center">
          <button id="loadmore" className="btn-main lead" onClick={onLoadMore}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
