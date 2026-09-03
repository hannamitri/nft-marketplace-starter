import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [newItems, setNewitems] = useState([]);
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  const visibleItems = newItems.slice(0, 7);
  const carouselKey = visibleItems.map((_, index) => index).join("-");

  useEffect(() => {
    let isMounted = true;
    async function fetchNewItems() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`,
        );
        if (isMounted) {
          setNewitems(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (isMounted) {
          setNewitems([]);
        }
      }
    }
    fetchNewItems();
  }, []);
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-in">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {visibleItems.length ? (
            <OwlCarousel key={carouselKey} className="owl-carousel owl-theme" {...options}>
              {visibleItems.map((items, index) => (
                <div className="item" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${items.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={items.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <Countdown expiryDate={items.expiryDate} />

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
                            <a href="#" target="_blank" rel="noreferrer">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${items.nftId}`}>
                        <img
                          src={items.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${items.id}`}>
                        <h4>{items.title}</h4>
                      </Link>
                      <div className="nft__item_price">{items.price}</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{items.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel className="owl-carousel owl-theme" {...options}>
                {new Array(4).fill(0).map((_, index) => (
                  <div className="item" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={``}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">5h 30m 32s</div>

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
                              <a href="#" target="_blank" rel="noreferrer">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to="/item-details">
                          <Skeleton width="100%" height="350px" />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <Skeleton width="180px" height="30px" />
                        </Link>
                        <Skeleton width="100px" height="20px" />

                        <div className="nft__item_like">
                          <Skeleton width="30px" height="15px" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
