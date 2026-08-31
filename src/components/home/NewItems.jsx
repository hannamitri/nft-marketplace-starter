import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const data = await response.json();

        setItems(Array.isArray(data) ? data : []);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (!items.length) return;

    const updateCountdowns = () => {
      const updatedTimes = {};

      items.forEach((item) => {
        const itemId = item.nftId || item.id;

        if (!item.expiryDate) {
          updatedTimes[itemId] = "Expired";
          return;
        }

        const endTime = Number(item.expiryDate);
        if (Number.isNaN(endTime)) {
          updatedTimes[itemId] = "Expired";
          return;
        }

        const now = Date.now();
        const diff = endTime - now;

        if (diff <= 0) {
          updatedTimes[itemId] = "Expired";
        } else {
          const totalSeconds = Math.floor(diff / 1000);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          updatedTimes[itemId] = `${hours}h ${minutes}m ${seconds}s`;
        }
      });

      setTimeLeft(updatedTimes);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, [items]);

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="row">
            {new Array(4).fill(0).map((_, i) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
                <Skeleton />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        <Slider {...settings} key={slidesToShow}>
          {items.map((item, index) => {
            const itemId = item.nftId || item.id;
            const authorId = item.authorId;

            return (
              <div key={itemId || index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    {authorId ? (
                      <Link to={`/author/${authorId}`}>
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt={item.title}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    ) : (
                      <span>
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt={item.title}
                        />
                        <i className="fa fa-check"></i>
                      </span>
                    )}
                  </div>

                  <div className="de_countdown">
                    {timeLeft[itemId] || "Loading..."}
                  </div>

                  <div className="nft__item_wrap">
                    {itemId ? (
                      <Link to={`/item-details/${itemId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    ) : (
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                      />
                    )}
                  </div>

                  <div className="nft__item_info">
                    {itemId ? (
                      <Link to={`/item-details/${itemId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                    ) : (
                      <h4>{item.title}</h4>
                    )}

                    <div className="nft__item_price">{item.price} ETH</div>

                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default NewItems;