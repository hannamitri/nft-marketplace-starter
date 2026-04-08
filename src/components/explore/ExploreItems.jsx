import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function DeCountdown({ endTime }) {
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = endTime - Date.now();

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
        return;
      }

      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div>
      {hours}h {minutes}m {seconds}s
    </div>
  );
}

const skeletonStyle = {
  backgroundColor: "#e0e0e0",
  borderRadius: "4px",
  animation: "pulse 1.5s infinite",
};

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((response) => {
        setAllItems(response.data);
        setItems(response.data.slice(0, 8));
        setLoading(false);
      });
  }, []);

  const sortedItems = [...items].sort((a, b) => {
    if (sortType === "price_low_to_high") return a.price - b.price;
    if (sortType === "price_high_to_low") return b.price - a.price;
    if (sortType === "likes_high_to_low") return b.likes - a.likes;
    return 0;
  });

  return (
    <>
      <div>
        <select id="filter-items" value={sortType} onChange={(e) => setSortType(e.target.value)}>

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
                <div
                  style={{
                    ...skeletonStyle,
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%",
                    margin: "8px auto",
                    left: "0px",
                  }}
                />y
                <div style={{ ...skeletonStyle, height: "180px" }} />
                <div
                  style={{
                    ...skeletonStyle,
                    height: "16px",
                    width: "60%",
                    margin: "8px auto",
                  }}
                />
              </div>
            </div>
          ))
        : sortedItems.map((item) => (
            <div
              key={item.id}
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
                {item.expiryDate && (
                  <div className="de_countdown">
                    <DeCountdown endTime={item.expiryDate} />
                  </div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <button>
                          <i className="fa fa-facebook fa-lg"></i>
                        </button>
                        <button>
                          <i className="fa fa-twitter fa-lg"></i>
                        </button>
                        <button>
                          <i className="fa fa-envelope fa-lg"></i>
                        </button>
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
      <div className="col-md-12 text-center">
        <button
          onClick={() => {
            const newCount = visibleCount + 4;
            setVisibleCount(newCount);
            setItems(allItems.slice(0, newCount));
          }}
          id="loadmore"
          className="btn-main lead"
        >
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
