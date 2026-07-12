import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const CountdownTimer = ({ expiryDate }) => {
  const calc = () => {
    const diff = expiryDate - Date.now();
    if (diff <= 0) return null;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${h}h ${m}m ${s}s`;
  };

  const [timeLeft, setTimeLeft] = useState(calc);

  useEffect(() => {
    const tick = () => {
      const diff = expiryDate - Date.now();
      if (diff <= 0) { setTimeLeft(null); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  if (!timeLeft) return null;
  return <div className="de_countdown">{timeLeft}</div>;
};

const PAGE_SIZE = 4;

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [liked, setLiked] = useState({});
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      });
  }, []);


  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sorted = [...items].sort((a, b) => {
    if (filter === "price_low_to_high") return a.price - b.price;
    if (filter === "price_high_to_low") return b.price - a.price;
    if (filter === "likes_high_to_low") return b.likes - a.likes;
    return a.id - b.id;
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setVisible(PAGE_SIZE);
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
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="200px" borderRadius="10px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="80%" height="20px" borderRadius="5px" />
                  <br />
                  <Skeleton width="50%" height="15px" borderRadius="5px" />
                </div>
              </div>
            </div>
          ))
        : sorted.slice(0, visible).map((item, index) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 fade-in-up"
          style={{ display: "block", backgroundSize: "cover", animationDelay: `${index * 0.1}s` }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link to={`/author/${item.authorId}`}>
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <CountdownTimer expiryDate={item.expiryDate} />
            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="#" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="#" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div
                className="nft__item_like"
                onClick={() => toggleLike(item.id)}
                style={{ cursor: "pointer" }}
              >
                <i className={`fa fa-heart${liked[item.id] ? "" : "-o"}`}></i>
                <span>{liked[item.id] ? item.likes + 1 : item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {visible < sorted.length && (
        <div className="col-md-12 text-center">
          <button
            onClick={() => setVisible((prev) => prev + PAGE_SIZE)}
            className="btn-main lead"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
