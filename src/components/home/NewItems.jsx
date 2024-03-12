import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CustomSlider from "./CustomSlider";
import "../../css/styles/btn.css";
import "../../css/styles/skeleton.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const NewItems = () => {
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setNewItem(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const calculateTimeLeft = (expiryDate) => {
    if (!expiryDate) {
      return null;
    }
    const diffrence = expiryDate ? +new Date(expiryDate) - +new Date() : 0;
    let timeLeft = {};

    if (diffrence > 0) {
      timeLeft = {
        hours: Math.floor((diffrence / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diffrence / (1000 * 60)) % 60),
        seconds: Math.floor((diffrence / 1000) % 60),
      };
    }
    return timeLeft;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewItem((prevItems) => {
        return prevItems.map((item) => {
          return { ...item, timeLeft: calculateTimeLeft(item.expiryDate) };
        });
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [newItem]);

  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number
  }

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
          <div className="slider-container">
            <CustomSlider>
              {loading
                ? [1, 2, 3, 4].map((index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-12 col-xs-12"
                      key={index}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap skeleton-wrap">
                          <div className="skeleton-img"></div>
                        </div>
                        <div className="nft_coll_pp">
                          <div className="skeleton-avatar"></div>
                        </div>
                        <div className="nft_coll_info">
                          <div className="skeleton-text"></div>
                          <div className="skeleton-text"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : newItem.map((item, index) => (
                    <div
                      className="col-lg col-md-12 col-sm-12 col-xs-12"
                      key={index}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {item.expiryDate && (
                          <div className="de_countdown">
                            {`${formatNumber(item.timeLeft && item.timeLeft.hours)}`}:{" "}
                            {`${formatNumber(item.timeLeft && item.timeLeft.minutes)}`}:{" "}
                            {`${formatNumber(item.timeLeft && item.timeLeft.seconds)}`}
                          
                          </div>
                        )}

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

                          <Link to={`/item-details/${item.authorId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.authorId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </CustomSlider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
