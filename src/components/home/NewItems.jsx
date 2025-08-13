import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const NewItems = () => {
  const [newItemsData, setNewitemsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 1200px)": {
        slides: { perView: 3, spacing: 12 },
      },
      "(max-width: 900px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 600px)": {
        slides: { perView: 1, spacing: 8 },
      },
    },
    slideChanged() {
      console.log("slide changed");
    },
  });

  async function getNewItemsData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    console.log("NewItemsData", data);
    setLoading(false);
    setNewitemsData(data);
  }

  function formatCountdown(expiryDate) {
    const diff = expiryDate - now;
    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  function hotItemsLoadingState() {
    return (
      <div ref={sliderRef} className="keen-slider">
        {new Array(4).fill(0).map((_, id) => (
          <div className="keen-slider__slide" key={id}>
            <div className="nft__item nft__item--skeleton">
              <div className="author_list_pp">
                <div className="nft-item__pp--skeleton skeleton-box"></div>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft__item_wrap">
                <div className="nft__item--preview nft-item__img--skeleton skeleton-box"></div>
              </div>
              <div className="nft__item--info nft__item--info--skeleton">
                <div className="nft-item__title--skeleton skeleton-box"></div>
                <div className="nft-item__price--skeleton skeleton-box"></div>
                <div className="nft-item__like--container">
                  <div className="nft-item__like--skeleton skeleton-box"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  useEffect(() => {
    getNewItemsData();
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
          <div className="keen-slider__container">
            <button
              className="keen-slider-arrow keen-slider-arrow--left"
              onClick={() => instanceRef.current && instanceRef.current.prev()}
            >
              <IoIosArrowBack />
            </button>
            {!loading ? (
              <>
                <div ref={sliderRef} className="keen-slider">
                  {newItemsData.map((nft, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                      key={index}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to="/author"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img
                              className="lazy"
                              src={nft.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="de_countdown">
                          {formatCountdown(nft.expiryDate)}
                        </div>

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
                              src={nft.nftImage}
                              className="lazy nft__item_preview "
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <h4>{nft.title}</h4>
                          </Link>
                          <div className="nft__item_price">
                            <span>{nft.price}</span> ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{nft.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              hotItemsLoadingState()
            )}
            <button
              className="keen-slider-arrow keen-slider-arrow--right"
              onClick={() => instanceRef.current && instanceRef.current.next()}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
