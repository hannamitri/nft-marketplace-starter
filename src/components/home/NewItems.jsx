/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "../UI/Skeleton";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((res) => {
        setNewItems(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const owlCarouselOptions = {
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
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton
                      height={"50px"}
                      width={"50px"}
                      borderRadius={"50%"}
                    />
                    <i className="fa fa-check"></i>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      display: "inline-block",
                      right: "20px",
                    }}
                  >
                    <Skeleton
                      height={"32px"}
                      width={"110px"}
                      borderRadius={"30px"}
                      border={"none"}
                    />
                  </div>
                  <div className="nft__item_wrap">
                    <Link to="/item-details">
                      <Skeleton
                        height={"219px"}
                        width={"219px"}
                        borderRadius={"8px"}
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>
                        <Skeleton height={"1rem"} width={"5rem"} />
                      </h4>
                    </Link>
                    <div style={{ display: "block" }}>
                      <Skeleton height={"1rem"} width={"3rem"} />
                    </div>
                    <div className="nft__item_like">
                      <span>
                        <Skeleton height={".75rem"} width={"1rem"} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <OwlCarousel className="owl-rtl" {...owlCarouselOptions}>
              {newItems.map((items, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${items.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={items.title}
                    >
                      <img className="lazy" src={items.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {items.expiryDate && (
                    <Countdown expiryDate={items.expiryDate} />
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
                        src={items.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{items.title}</h4>
                    </Link>
                    <div className="nft__item_price">{items.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{items.likes}</span>
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
