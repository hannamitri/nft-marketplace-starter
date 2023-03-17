import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../css/styles/loadingState.css";
import CountDown from "../Countdown";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((response) => {
        setNewItems(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const options = {
    items: 4,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    rewind: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  const renderSkeleton = () => (
    <div className="nft__item">
      <div className="nft__item_wrap">
        <div
          className="skeleton-box"
          style={{width: "100%", height: "240px" }}
        ></div>
      </div>
      <div className="nft__item_info">
        <div className="skeleton-text-wrapper">
          <div
            className="skeleton-box"
            style={{ width: "200px", height: "20px", marginBottom: "8px" }}
          ></div>
          <div
            className="skeleton-box"
            style={{ width: "100px", height: "20px" }}
          ></div>
        </div>
      </div>
    </div>
  );

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
          {isLoading ? (
            <>
              <OwlCarousel className="owl-theme" {...options}>
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index}>{renderSkeleton()}</div>
                  ))}
              </OwlCarousel>
            </>
          ) : (
            <OwlCarousel className="owl-theme" {...options}>
              {newItems.map((items) => (
                <div key={items.id}>
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
                    {items.expiryDate && (
                      <CountDown key={items.id} expiryDate={items.expiryDate} />
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
                      <Link to={`/item-details/${items.nftId}`}>
                        <img
                          src={items.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${items.nftId}`}>
                        <h4>{items.title}</h4>
                      </Link>
                      <div className="nft__item_price">{items.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{items.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
