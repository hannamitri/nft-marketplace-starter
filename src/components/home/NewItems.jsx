import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewItems.css";

const NewItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  const setting = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    let timer;

    async function fetchData() {
      setLoading(true);

      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );

      const result = await response.json();
      setData(result);

      timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    fetchData();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

          <Slider {...setting}>
            {loading ? (
              new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft__item">
                    <div className="nft__item_wrap skeleton"></div>
                  </div>
                </div>
              ))
            ) : (
              data.map((item, index) => {
                const remainingTime = Math.max(
                  0,
                  item.expiryDate - now
                );

                const seconds = Math.floor(
                  (remainingTime / 1000) % 60
                );
                const minutes = Math.floor(
                  (remainingTime / 1000 / 60) % 60
                );
                const hours = Math.floor(
                  (remainingTime / 1000 / 60 / 60) % 24
                );
                const days = Math.floor(
                  remainingTime / 1000 / 60 / 60 / 24
                );

                return (
                  <div key={index}>
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

                      {remainingTime > 0 && (
                        <div className="de_countdown">
                        {days}d {hours}h {minutes}m {seconds}s
                      </div>
                      )}
                      

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>

                            <div className="nft__item_share">
                              <h4>Share</h4>

                              <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>

                              <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>

                              <a href="#">
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
                );
              })
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;