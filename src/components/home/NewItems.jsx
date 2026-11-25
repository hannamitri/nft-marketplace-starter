import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import $ from "jquery";

window.$ = window.jQuery = $;
require("owl.carousel");

const CountdownTimer = ({ expiryDate }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!expiryDate) return null;
  const expiration = Number(expiryDate);

  if(!Number.isFinite(expiration)) return null;
  const remaining = expiration - currentTime;

  if (remaining <= 0) {
    return <div className="de_countdown">Expired</div>;
  }

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  return(
    <div className="de_countdown">
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        setItems(response.data);
      } catch(error) {
        console.error("Error fetching new items:", error);
        setError("Unable to load new items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (loading || !items.length || !carouselRef.current) return;

    const $carousel = $(carouselRef.current);
    $carousel.owlCarousel({
      loop: items.length > 4,
      margin: 15,
      nav: true,
      dots: false,
      autoplay: false,
      smartSpeed: 600,
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        },
        992: {
          items: 4
        }
      }
    });

    return () => {
      if ($carousel.hasClass("owl-loaded")) {
        $carousel.trigger("destroy.owl.carousel");
      }
    };
  }, [loading, items]);

  return(
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading && new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>

                <div className="de_countdown">
                  <Skeleton width="85px" height="20px" borderRadius="20px" />
                </div>

                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="200px" borderRadius="8px" />
                </div>

                <div className="nft__item_info">
                  <Skeleton width="130px" height="18px" />

                  <div className="nft__item_price">
                    <Skeleton width="75px" height="15px" />
                  </div>

                  <div className="nft__item_like">
                    <Skeleton width="35px" height="15px" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {error && (
            <div className="col-lg-12 text-center">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="col-lg-12 text-center">
              <p>No new items available.</p>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="col-lg-12">
              <div className="owl-carousel" ref={carouselRef}>
                {items.map((item) => (
                  <div className="item" key={item.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to="/author" data-bs-toggle="tooltip" data-bs-placement="top" title={`Creator ID: ${item.authorId}`}>
                          <img className="lazy" src={item.authorImage} alt={`${item.title} creator`} />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {item.expiryDate && (
                        <CountdownTimer expiryDate={item.expiryDate} />
                      )}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button type="button">Buy Now</button>

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
                          <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to="/item-details">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;