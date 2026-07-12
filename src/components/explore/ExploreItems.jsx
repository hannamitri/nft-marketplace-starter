import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
//API https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low

const calcTimeLeft = (expiryDate) => {
  const diff = new Date(expiryDate) - new Date();
  if (diff <= 0) return "Expired";
  const hour = Math.floor(diff / 1000 / 60 / 60);
  const min = Math.floor((diff / 1000 / 60) % 60);
  const sec = Math.floor((diff / 1000) % 60);
  return `${hour}h ${min}m ${sec}s`;
};

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(expiryDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const result = calcTimeLeft(expiryDate);
      setTimeLeft(result);
      if (result === "Expired") clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("likes_high_to_low");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    setLoading(true);
    setVisibleCount(8);
    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error: ", err);
        setLoading(false);
      });
  }, [filter]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
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
                  <div className="skeleton skeleton-avatar" />
                </div>
                <div className="nft__item_wrap">
                  <div className="skeleton skeleton-img" />
                </div>
                <div className="nft__item_info">
                  <div className="skeleton skeleton-text" />
                  <div className="skeleton skeleton-text-sm" />
                </div>
              </div>
            </div>
          ))
        : items.slice(0, visibleCount).map((item) => (
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
                  >
                    <img
                      src={item.authorImage}
                      alt={item.authorName}
                      className="lazy"
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {"expiryDate" in item && (
                  <Countdown expiryDate={item.expiryDate} />
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
                      alt={item.title}
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
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
        {visibleCount < items.length && (
          <button
            id="loadmore"
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="btn-main lead"
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
