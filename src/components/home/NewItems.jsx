import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import $ from "jquery";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Countdown = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!endTime) return;

    const update = () => {
      const remaining = Math.max(0, endTime - Date.now());
      setTimeLeft(remaining);
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  if (!endTime) return <span>—</span>;

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  parts.push(`${hours}h`, `${minutes}m`, `${seconds}s`);

  return <span>{parts.join(" ")}</span>;
};

const NewItems = () => {
  const API_URL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

  const [newItems, setNewItems] = useState([]);
  const [loadedImages, setLoadedImages] = useState({ main: {}, author: {} });
  const [likeCounts, setLikeCounts] = useState({});
  const [liked, setLiked] = useState({});

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setNewItems(response.data);
        const counts = {};
        response.data.forEach((it, idx) => {
          counts[idx] = typeof it.likes === "number" ? it.likes : 0;
        });
        setLikeCounts(counts);
        setLiked({});
      })
      .catch((error) => {
        console.log("Error Fetching Data", error);
      });
  }, []);

  const getEndTime = (item) => {
    if (!item) return null;
    if (item.expiryDate) return new Date(item.expiryDate).getTime();
    if (item.expiry) return new Date(item.expiry).getTime();
    if (typeof item.endingIn === "number") return Date.now() + item.endingIn * 1000;
    return null;
  };

  const toggleLike = (index, baseLikes) => {
    setLiked((prevLiked) => {
      const nextLiked = !prevLiked[index];
      setLikeCounts((prevCounts) => {
        const current = prevCounts[index] !== undefined ? prevCounts[index] : (typeof baseLikes === "number" ? baseLikes : 0);
        const next = current + (nextLiked ? 1 : -1);
        return { ...prevCounts, [index]: Math.max(0, next) };
      });
      return { ...prevLiked, [index]: nextLiked };
    });
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <ReactOwlCarousel
            className="owl-theme"
            loop
            margin={10}
            nav
            items={4}
          >
            {(newItems.length ? newItems : new Array(4).fill({})).map((item, index) => {
              const hasMain = Boolean(item && item.nftImage);
              const hasAuthor = Boolean(item && item.authorImage);
              const isLiked = Boolean(liked[index]);
              const displayedLikes = likeCounts[index] !== undefined ? likeCounts[index] : (typeof item.likes === "number" ? item.likes : 69);

              return (
                <div className="item" key={item.id || index}>
                  <div className="px-1">
                    <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.author || "Monica Lucas"}`}
                      >
                        <div className="position-relative" style={{ width: 50, height: 50 }}>
                          {!hasAuthor || !loadedImages.author[index] ? (
                            <div
                              className="skeleton-box"
                              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                            ></div>
                          ) : null}
                          {hasAuthor ? (
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage || AuthorImage}
                              alt=""
                              onLoad={() =>
                                setLoadedImages((prev) => ({
                                  ...prev,
                                  author: { ...prev.author, [index]: true },
                                }))
                              }
                              style={{ display: loadedImages.author[index] ? "block" : "none" }}
                            />
                          ) : null}
                        </div>
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {getEndTime(item) ? (
                      <div className="de_countdown"><Countdown endTime={getEndTime(item)} /></div>
                    ) : null}

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
                        <div className="position-relative" style={{ width: "100%" }}>
                          {!hasMain || !loadedImages.main[index] ? (
                            <div className="skeleton-box" style={{ width: "100%", paddingTop: "100%" }}></div>
                          ) : null}
                          {hasMain ? (
                            <img
                              src={item.nftImage || nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                              onLoad={() =>
                                setLoadedImages((prev) => ({
                                  ...prev,
                                  main: { ...prev.main, [index]: true },
                                }))
                              }
                              style={{ display: loadedImages.main[index] ? "block" : "none" }}
                            />
                          ) : null}
                        </div>
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title || "Pinky Ocean"}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price ? `${item.price} ETH` : "3.08 ETH"}</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes || 69}</span>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ReactOwlCarousel>
          
        </div>
      </div>
    </section>
  );
};

export default NewItems;
