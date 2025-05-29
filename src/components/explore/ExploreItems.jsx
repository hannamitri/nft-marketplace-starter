import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../UI/Loading";

const ExploreItems = () => {
  const [post, setPost] = useState([]);
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  function showMorePosts() {
    setVisible((prev) => prev + 4);
  }

  function filterPosts(filter) {
    if (filter === "price_low_to_high") {
      setPost(post.sort((a, b) => a.price - b.price));
    } else if (filter === "price_high_to_low") {
      setPost(post.sort((a, b) => b.price - a.price));
    } else if (filter === "likes_high_to_low") {
      setPost(post.sort((a, b) => b.likes - a.likes));
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchPost() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
      );
      setPost(data);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    fetchPost();
  }, []);

  const getCountdown = (expiry) => {
    const diff = expiry - Date.now();
    if (diff <= 0) return "00:00:00";
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue="DEFAULT"
          onChange={(event) => filterPosts(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {post.slice(0, visible).map((posts, index) => (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div
              key={index}
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
                    <img className="lazy" src={posts.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  {getCountdown(posts.expiryDate)}
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
                  <Link to="/item-details">
                    <img
                      src={posts.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{posts.title}</h4>
                  </Link>
                  <div className="nft__item_price">{posts.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{posts.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ))}
      <div className="col-md-12 text-center">
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={showMorePosts}
          
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
