import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";

const Countdown = ({ expiryDate }) => {
  const getTimeLeft = () => new Date(expiryDate).getTime() - Date.now();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  if (timeLeft <= 0) {
    return <div className="de_countdown">Expired</div>;
  }

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="de_countdown">
      {days > 0 && `${days}d `}
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

const SkeletonCard = () => (
  <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
    <div className="nft__item">
      <div className="author_list_pp">
        <span
          className="skeleton-box"
          style={{ width: 50, height: 50, borderRadius: "100%" }}
        ></span>
      </div>

      <span
        className="skeleton-box"
        style={{ width: 70, height: 16, marginBottom: 10 }}
      ></span>

      <div className="nft__item_wrap">
        <span
          className="skeleton-box"
          style={{ width: "100%", height: 220, borderRadius: 8 }}
        ></span>
      </div>

      <div className="nft__item_info">
        <span
          className="skeleton-box"
          style={{ width: "70%", height: 18, marginBottom: 10 }}
        ></span>
        <span
          className="skeleton-box"
          style={{ width: "40%", height: 14, marginBottom: 10 }}
        ></span>
        <span
          className="skeleton-box"
          style={{ width: "25%", height: 14 }}
        ></span>
      </div>
    </div>
  </div>
);

const INITIAL_VISIBLE = 8;
const LOAD_MORE_STEP = 4;

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    setLoading(true);
    const baseUrl =
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    const url = sortOption ? `${baseUrl}?filter=${sortOption}` : baseUrl;

    axios.get(url).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, [sortOption]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        Aos.init({
          offset: 0, 
          duration: 800,
          once: true,
        });
      }, 100);
    }
  }, [loading]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [sortOption]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  const hasMore = visibleCount < items.length;
  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? Array.from({ length: INITIAL_VISIBLE }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : items.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              data-aos="fade-up"
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
                <Countdown expiryDate={item.expiryDate} />

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
                  <Link to={`/item-details/${item.authorId}`}>
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
      {hasMore && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
