import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useExplore from "../../hooks/useExplore";

const Countdown = ({ expiryDate }) => {
  const getTimeLeft = () => {
    const diff = expiryDate - Date.now();
    if (diff <= 0) return null;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${h}h ${m}m ${s}s`;
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    if (!expiryDate) return;
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  if (!timeLeft) return null;
  return <div className="de_countdown">{timeLeft}</div>;
};

const SkeletonItem = () => (
  <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block" }}>
    <div className="nft__item">
      <div className="author_list_pp">
        <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
      </div>
      <div className="nft__item_wrap">
        <div className="skeleton" style={{ width: "100%", height: "200px", borderRadius: "8px" }}></div>
      </div>
      <div className="nft__item_info">
        <div className="skeleton" style={{ width: "80%", height: "20px", marginBottom: "8px" }}></div>
        <div className="skeleton" style={{ width: "40%", height: "16px" }}></div>
      </div>
    </div>
  </div>
);

const ExploreItems = () => {
  const { data: items, loading } = useExplore();
  const [filter, setFilter] = useState("");
  const [visible, setVisible] = useState(8);

  const filtered = [...items].sort((a, b) => {
    if (filter === "price_low_to_high") return a.price - b.price;
    if (filter === "price_high_to_low") return b.price - a.price;
    if (filter === "likes_high_to_low") return b.likes - a.likes;
    return 0;
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setVisible(8);
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

      {loading
        ? new Array(8).fill(0).map((_, i) => <SkeletonItem key={i} />)
        : filtered.slice(0, visible).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}
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
                    <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
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

      {!loading && visible < filtered.length && (
        <div className="col-md-12 text-center">
          <button
            onClick={() => setVisible((prev) => prev + 4)}
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;