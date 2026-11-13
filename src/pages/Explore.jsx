import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import subheaderImage from "../images/subheader.jpg";


const Explore = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const fetchExploreItems = async () => {
      setLoading(true);
      try {
        let url = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        if (filter) {
          url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`;
        }
        const response = await axios.get(url);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filter]);

  // Countdown timer logic
  useEffect(() => {
    if (items.length === 0) return;

    const updateTimers = () => {
      const newTimeLeft = {};
      items.forEach((item) => {
        if (!item.expiryDate) return;
        const diff = item.expiryDate - Date.now();
        if (diff <= 0) {
          newTimeLeft[item.id] = "EXPIRED";
        } else {
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / 1000 / 60) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          newTimeLeft[item.id] = `${hours}h ${minutes}m ${seconds}s`;
        }
      });
      setTimeLeft(newTimeLeft);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [items]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

      <section
      id="section-explore"
      className="aria-label breadcrumb-overlay"
      style={{
      background: `url(${subheaderImage}) top / cover`,
      padding: "120px 0 80px 0",
       }}
       data-aos="fade-in"
       data-aos-duration="1000"
>
  <div className="container">
    <div className="row">
      <div className="col-lg-12" data-aos="fade-down" data-aos-delay="200">
        <div className="text-center">
          <h2>Explore</h2>
          <div className="small-border bg-color-2"></div>
        </div>
      </div>
    </div>


            {/* Filter Dropdown */}
            <div className="row">
              <div className="col-md-12">
                <div className="items_filter">
                  <select
                    id="filter-items"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    aria-label="Filter Items"
                  >
                    <option value="">Default</option>
                    <option value="price_low_to_high">Price, Low to High</option>
                    <option value="price_high_to_low">Price, High to Low</option>
                    <option value="likes_high_to_low">Most Liked</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <div className="row">
              {loading ? (
                new Array(8).fill(0).map((_, index) => (
                  <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundColor: "#e0e0e0",
                          }}
                        ></div>
                      </div>
                      <div
                        className="nft__item_wrap skeleton-box"
                        style={{
                          height: "200px",
                          backgroundColor: "#e0e0e0",
                          borderRadius: "8px",
                          marginBottom: "20px",
                        }}
                      ></div>
                      <div className="nft__item_info">
                        <div
                          className="skeleton-box mb-2"
                          style={{ height: "18px", width: "70%", backgroundColor: "#e0e0e0" }}
                        ></div>
                        <div
                          className="skeleton-box"
                          style={{ height: "14px", width: "40%", backgroundColor: "#e0e0e0" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                items.slice(0, visibleCount).map((item) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={item.id}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy"
                            src={item.authorImage || AuthorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {item.expiryDate && (
                        <div className="de_countdown">
                          {timeLeft[item.id] || "Loading..."}
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

                        <Link to={`/item-details/${item.nftId || item.id}`}>
                          <img
                            src={item.nftImage || nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId || item.id}`}>
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
                ))
              )}
            </div>

            {/* Load More Button */}
            {!loading && visibleCount < items.length && (
              <div className="row">
                <div className="col-lg-12 text-center">
                  <button onClick={handleLoadMore} className="btn-main lead">
                    Load More
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
