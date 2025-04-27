import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNewItems } from "../../api/api";
import ResponsiveSlider from "./ResponsiveSlider";
import SkeletonLoader from "./SkeletonLoader";

const NewItems = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await getNewItems();
      setCollections(data);
      setLoading(false);
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = collections.reduce((acc, collection) => {
        const timeLeft = calculateTimeLeft(collection.expiryDate);
        acc[collection.id] = timeLeft;
        return acc;
      }, {});
      setCountdowns(newCountdowns);
    }, 1000);
    return () => clearInterval(interval);
  }, [collections]);

  const calculateTimeLeft = (expiryDate) => {
    const difference = +new Date(expiryDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <ResponsiveSlider>
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <SkeletonLoader />
                </div>
              ))}
            </ResponsiveSlider>
          </div>
        </div>
      </section>
    );
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
          <ResponsiveSlider>
            {collections.map((collection, index) => {
              const countdown = countdowns[collection.id];
              const hasTimeLeft =
                countdown &&
                (countdown.hours > 0 ||
                  countdown.minutes > 0 ||
                  countdown.seconds > 0);

              return (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${collection.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${collection.authorName}`}
                      >
                        <i className="fa fa-check"></i>
                        <img
                          className="lazy"
                          src={collection.authorImage}
                          alt={collection.authorName}
                        />
                      </Link>
                    </div>

                    {hasTimeLeft && (
                      <div className="de_countdown">
                        {countdown.days} {countdown.hours}h {countdown.minutes}m{" "}
                        {countdown.seconds}s
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

                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <h4>{collection.title}</h4>
                      </Link>
                      <div className="nft__item_price">
                        {collection.price} ETH
                      </div>
                      <div className="nft__item_like">
                        {collection.likes}
                        <span></span>
                        <i className="fa fa-heart"></i>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ResponsiveSlider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
