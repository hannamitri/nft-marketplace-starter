import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function formatTime(ms) {
  if (ms <= 0) return "00h 00m 00s";
  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}h ${m}m ${s}s`;
}

const ExploreItems = ({ onItemClick }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [now, setNow] = useState(Date.now());
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    let url = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    if (filter) {
      url += `?filter=${filter}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filter]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

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
      {loading
        ? Array.from({ length: visibleCount }).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <div className="skeleton skeleton-avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                </div>
                <div className="de_countdown">
                  <div className="skeleton skeleton-title" style={{ width: "60%", height: "20px" }}></div>
                </div>
                <div className="nft__item_wrap">
                  <div className="skeleton skeleton-img" style={{ width: "100%", height: "200px", borderRadius: "8px" }}></div>
                </div>
                <div className="nft__item_info">
                  <div className="skeleton skeleton-title" style={{ width: "80%", height: "20px" }}></div>
                  <div className="skeleton skeleton-code" style={{ width: "40%", height: "16px" }}></div>
                </div>
              </div>
            </div>
          ))
        : items.slice(0, visibleCount).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover", cursor: "pointer" }}
              onClick={() => onItemClick && onItemClick(item)}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  {formatTime(item.expiryDate - now)}
                </div>
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
                  <Link 
                    to={{
                      pathname: `/item-details/${item.nftId}`,
                    }}
                    state={{ itemData: item }}
                  >
                    <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link 
                    to={{
                      pathname: `/item-details/${item.nftId}`,
                    }}
                    state={{ itemData: item }}
                  >
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
        {visibleCount < items.length && (
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleCount((count) => count + 8)}
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;