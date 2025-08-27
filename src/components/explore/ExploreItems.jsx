import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const ExploreItems = () => {
  const initialPosts = 8;
  const incrementInitialPostList = 4;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayPosts, setDisplayPosts] = useState(initialPosts);
  const [time, setTime] = useState(Date.now());
  const [filter, setFilter] = useState([]);

  const handleLoadMore = () => {
    setDisplayPosts((prev) => prev + incrementInitialPostList);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (expiryDate, now) => {
    if (!expiryDate) return null;

    const expiry =
      typeof expiryDate === "string"
        ? new Date(expiryDate).getTime()
        : Number(expiryDate);

    const diff = expiry - now;
    if (diff <= 0) return "Expired";

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2)}h
      ${minutes.toString().padStart(2)}m
      ${seconds.toString().padStart(2)}s`;
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        );
        setItems(data);
      } catch (err) {
        console.error("Error fetching Expore Items", err);
      } finally {
        setLoading(false)
      };
    };
    fetchItems();
  }, [filter]);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => setFilter(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      
      {loading ? (
      new Array(8).fill(0).map((_, index) => (
        <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
          <div className="card placeholder-glow">
            <div className="card-img-top placeholder" style={{ height: "200px"}}></div>
            <div className="card-body">
              <h5 className="card-title">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text">
                <span className="placeholder col-4"></span>
              </p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <>
      {items.slice(0, displayPosts).map((item, index) => (
        <div
          key={item.id || index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {formatTime(item.expiryDate, time) && (
            <div className="de_countdown">
              {formatTime(item.expiryDate, time)}
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
      {displayPosts < items.length && (
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
    )}
    </>
  );
};

export default ExploreItems;
