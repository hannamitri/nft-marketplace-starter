import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import CountdownTimer from "../CountdownTimer";

const NewItems = () => {
  const [loading, SetLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(max-width: 1200px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(max-width: 780px)": {
        slides: {
          perView: 2,
          spacing: 6,
        },
      },
      "(max-width: 540px)": {
        slides: {
          perView: 1,
          spacing: 0,
        },
      },
    },
    slides: {
      perView: 4,
      spacing: 10,
    },
  });

  const getPerView = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1920;
    if (w <= 540) return 1;
    if (w <= 780) return 2;
    if (w <= 1200) return 3;
    return 4;
  };
  const [perView, setPerView] = useState(getPerView());

  async function getItems() {
    SetLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    SetLoading(false);
  }

  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    getItems();
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

          {loading ? (
            <div className="navigation-wrapper">
              <div className="keen-slider">
                {Array.from({ length: perView }).map((_, i) => (
                  <div className="keen-slider__slide" key={`skel-${i}`}>
                    <div className="nft__item_wrap">
                      <div
                        className="skeleton-box"
                        style={{ width: "100%", height: "350px" }}
                      ></div>
                    </div>

                    <div className="nft__item_info">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "180px",
                          height: "30px",
                        }}
                      ></div>
                    </div>
                    <div className="nft__item_price">
                      <div
                        className="skeleton-box"
                        style={{ width: "100px", height: "20px" }}
                      ></div>
                    </div>
                    <div className="nft__item_like">
                      <div
                        className="skeleton-box"
                        style={{ width: "30px", height: "15px" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="navigation-wrapper">
              {items.length > 0 && (
                <div ref={sliderRef} className="keen-slider">
                  {items.map((item) => (
                    <div className="keen-slider__slide" key={item.id}>
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
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {item.expiryDate && (
                          <div className="de_countdown">
                            <CountdownTimer expiryDate={item.expiryDate} />
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
              )}
              {
                <>
                  <button
                    className="arrow arrow-left"
                    onClick={() => instanceRef.current.prev()}
                  >
                    {" "}
                    &lt;
                  </button>
                  <button
                    className="arrow arrow-right"
                    onClick={() => instanceRef.current.next()}
                  >
                    {" "}
                    &gt;
                  </button>
                </>
              }
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
