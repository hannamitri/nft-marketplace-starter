import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "../../css/styles/new-items.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },

    breakpoints: {
      "(max-width: 991px)": {
        slides: {
          perView: 3,
          spacing: 12,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 12,
        },
      },
      "(max-width: 576px)": {
        slides: {
          perView: 1,
          spacing: 12,
        },
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const timeUpdates = {};
      items.forEach((item) => {
        if (item.expiryDate) {
          const difference = item.expiryDate - Date.now();
          if (difference <= 0) {
            timeUpdates[item.id] = "Expired";
          } else {
            const totalSeconds = Math.floor(difference / 1000);
            const seconds = totalSeconds % 60;
            const minutes = Math.floor(totalSeconds / 60) % 60;
            const hours = Math.floor(totalSeconds / 3600);

            timeUpdates[item.id] = `${hours}h ${minutes}m ${seconds}s `;
          }
        }
      });
      setTimeLeft(timeUpdates);
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  const showSlider = !loading && items.length > 0;

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        setLoading(true);
        const gotItems = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        )
        setItems(gotItems.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewItems();
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
          <div className="slider__wrapper">
            {showSlider && (
              <button
                className="left__arrow arrows"
                onClick={() => instanceRef.current?.prev()}
              >
                ➩
              </button>
            )}
            {loading ? (
              <div className="loading__state--container">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <div className="author__img--loading skeleton"></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="de_countdown"></div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
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
                      <div className="nft__img--loading skeleton"></div>
                      {/* <img src="" className="lazy nft__item_preview" alt="" /> */}
                    </div>
                    <div className="nft__item_info">
                      <div className="nft__title--loading skeleton"></div>
                      <div className="nft__price--loading skeleton"></div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span className="nft__likes--loading skeleton"></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="empty-state">No collections found</div>
            ) : (
              <div ref={sliderRef} className="keen-slider">
                {items?.map((item, index) => (
                  <div className="keen-slider__slide" key={item.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {/* <div className="de_countdown">5h 30m 32s</div> */}
                      {item.expiryDate ? (
                        <div className="de_countdown">
                          {timeLeft[item.id] || "Loading..."}
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
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price}</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {showSlider && (
              <button
                className="right__arrow arrows"
                onClick={() => instanceRef.current?.next()}
              >
                ➩
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
