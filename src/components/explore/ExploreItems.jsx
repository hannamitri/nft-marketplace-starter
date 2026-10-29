import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const calculateTime = () => {
      const difference = new Date(expiryDate) - new Date();

      if (difference <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTime(); // Run instantly on mount
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate || timeLeft === "Expired") return null;

  return <div className="de_countdown">{timeLeft}</div>;
};

const ExploreItems = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [filter, setFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);

  // 2. Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation speed
      once: true, // Animate only once while scrolling down
    });
  }, []);

  // 3. Refresh AOS calculations when loading completes, filter shifts, or new items load
  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading, filter, visibleItems]);

  useEffect(() => {
    async function fetchExploreItems() {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?userId=${id}`,
      );
      setPosts(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    fetchExploreItems();
  }, [id]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    setVisibleItems((prevValue) => prevValue + 4);
  };

  const getSortedPosts = () => {
    let sorted = [...posts];

    if (filter === "price_low_to_high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (filter === "price_high_to_low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (filter === "likes_high_to_low") {
      sorted.sort((a, b) => b.likes - a.likes);
    }

    return sorted;
  };

  const sortedPosts = getSortedPosts();
  const Posts = sortedPosts.slice(0, visibleItems);

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

      {/* 1. SKELETON LOADING STATE */}
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={`item-skeleton-${index}`}
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item" style={{ position: "relative" }}>
                <div className="author_list_pp" style={{ zIndex: 2 }}>
                  <div
                    className="skeleton-loading"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#eee",
                    }}
                  ></div>
                </div>

                <div className="nft__item_wrap">
                  <div
                    className="skeleton-loading nft__item_preview"
                    style={{
                      width: "100%",
                      height: "150px",
                      borderRadius: "8px",
                      backgroundColor: "#eee",
                    }}
                  ></div>
                </div>

                <div className="nft__item_info" style={{ marginTop: "15px" }}>
                  <div
                    className="skeleton-loading"
                    style={{
                      width: "70%",
                      height: "18px",
                      backgroundColor: "#eee",
                      borderRadius: "4px",
                      marginBottom: "10px",
                    }}
                  ></div>

                  <div
                    className="skeleton-loading"
                    style={{
                      width: "40%",
                      height: "14px",
                      backgroundColor: "#eee",
                      borderRadius: "4px",
                    }}
                  ></div>

                  <div
                    className="nft__item_like skeleton-loading"
                    style={{
                      width: "35px",
                      height: "15px",
                      backgroundColor: "#eee",
                      borderRadius: "4px",
                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        : /* 2. ACTUAL POSTS DATA STATE */
          Posts.map((post, index) => (
            <div
              key={post.id || index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              // 4. Added AOS attributes to columns. Delay is dynamically mapped to stagger grid items
              data-aos="zoom-in"
              data-aos-delay={(index % 4) * 100}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${post.authorId || id}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img
                      className="lazy"
                      src={post.authorImage || AuthorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <Countdown expiryDate={post.expiryDate} />

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <Link to="/author" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </Link>
                        <Link to="/author" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </Link>
                        <Link to="/author">
                          <i className="fa fa-envelope fa-lg"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${post.nftId}`}>
                    <img
                      src={post.nftImage || nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${post.nftId}`}>
                    <h4>{post.title}</h4>
                  </Link>
                  <div className="nft__item_price">{post.price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

      {/* 3. DYNAMIC LOAD MORE ACTIONS */}
      {!loading && visibleItems < posts.length && (
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
