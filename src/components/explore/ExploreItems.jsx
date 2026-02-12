import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const calculateCountdown = (expiryTimeStamp) => {
  const total = expiryTimeStamp - Date.now();

  if (total <= 0) {
    return null;
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

  return `${hours}h  ${minutes}m  ${seconds}s`;
};

const Countdown = React.memo(({ expiryDate }) => {
  const [time, setTime] = useState(() => calculateCountdown(expiryDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateCountdown(expiryDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!time) return null;

  return <div className="de_countdown">{time}</div>;
});

const SkeletonCard = () => (
  <div
    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
    style={{ display: "block", marginBottom: "20px" }}
  >
    <div
      className="nft__item"
      style={{
        pointerEvents: "none",
        padding: "15px",
        borderRadius: "12px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#e0e0e0",
          marginBottom: "10px",
        }}
      ></div>

      <div
        style={{
          height: "15px",
          width: "50%",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          marginBottom: "15px",
        }}
      ></div>

      <div className="nft__item_wrap">
        <div
          style={{
            width: "100%",
            height: "250px",
            backgroundColor: "#e0e0e0",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        ></div>
      </div>

      <div style={{ marginTop: "10px" }}>
        <div
          style={{
            height: "18px",
            width: "60%",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        ></div>

        <div
          style={{
            height: "16px",
            width: "40%",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
          }}
        ></div>
      </div>
    </div>
  </div>
);

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const url = filter
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
          : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        const response = await axios.get(url);
        setItems(response.data);
        setVisibleCount(8);
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [filter]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      <div className="row">
        {loading
          ? new Array(8).fill(0).map((_, index) => <SkeletonCard key={index} />)
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
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {item.expiryDate && (
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
      </div>
      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
            type="button"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
