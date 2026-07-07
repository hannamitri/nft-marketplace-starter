import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "../../css/styles/exploreitems.css";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [status, setStatus] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const originalDataRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeUpdates = {};
      allData.forEach((item) => {
        if (item.expiryDate) {
          const diff = item.expiryDate - Date.now();
          if (diff <= 0) {
            timeUpdates[item.id] = "Expired";
          } else {
            const totalSeconds = diff / 1000;
            const seconds = Math.floor(totalSeconds % 60);
            const minutes = Math.floor(totalSeconds / 60) % 60;
            const hours = Math.floor(totalSeconds / 3600);

            timeUpdates[item.id] = `${hours}h ${minutes}m ${seconds}s`;
          }
        }
      });
      setTimeLeft(timeUpdates);
    }, 1000);

    return () => clearInterval(interval);
  }, [allData]);

  useEffect(() => {
    if (!originalDataRef.current.length) return;

    if (status === "") {
      setAllData([...originalDataRef.current]);
      return;
    }

    const sortedData = [...allData];

    if (status === "price_low_to_high") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (status === "price_high_to_low") {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (status === "likes_high_to_low") {
      sortedData.sort((a, b) => b.likes - a.likes);
    }
    setAllData(sortedData);
  }, [status]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const storedData = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${status}`,
        );
        originalDataRef.current = storedData.data;
        setAllData(storedData.data);
      };
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <div className="author__img--loading skeleton shimmer__loading"></div>
                  <i className="fa fa-check"></i>
                </div>
                <div className="de_countdown de_countdown--loading skeleton"></div>

                <div className="nft__item_wrap">
                  <div className="nft__img--loading skeleton"></div>
                </div>
                <div className="nft__item_info">
                  <div className="nft__title--loading skeleton"></div>
                  <div className="nft__price--loading skeleton"></div>
                  <div className="nft__item_like">
                    <div className="nft__likes--loading skeleton"></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : allData.slice(0, visibleCount).map((data) => (
            <div
              key={data.id}
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
                    <img className="lazy" src={data.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {data.expiryDate ? (
                  <div className="de_countdown">
                    {timeLeft[data.id] || "Loading..."}
                  </div>
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
                    <img
                      src={data.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{data.title}</h4>
                  </Link>
                  <div className="nft__item_price">{data.price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{data.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        <button
          onClick={loadMore}
          id="loadmore"
          className="btn-main lead"
          style={{
            visibility: visibleCount < allData.length ? "visible" : "hidden",
          }}
        >
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
