import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Timer from "../UI/Timer";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const carousel = {
    items: 4,
    loop: true,
    margin: 8,
    nav: true,
    dots: false,
    rewind: false,
    responsive: {
      1200: {
        items: 4,
      },
      992: {
        items: 3,
      },
      768: {
        items: 2,
      },
      0: {
        items: 1,
      },
    },
  };

  async function fetchNewItems() {
    const res = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    const { data } = res;
    setNewItems(data);
    setIsLoading(false);
  }

  useEffect(() => {
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

          {isLoading ? (
            <>
              <OwlCarousel className="owl-theme" {...carousel}>
                {new Array(4).fill(0).map((_, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={index}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <div
                          className="skeleton__author_list_pp"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        ></div>

                        <div className="lazy"></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="de_countdown">0h 00m 00s</div>

                      <div className="nft__item_wrap">
                        <div
                          className="skeleton__wrap"
                          style={{
                            width: "100%",
                            height: "350px",
                          }}
                        >
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <div className="nft__item_share">
                               
                              </div>
                            </div>
                          </div>
                          <div className="lazy nft__item_preview"></div>
                        </div>
                      </div>
                      <div className="nft__item_info">
                        <div className="nft__item_price">ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          ) : (
            <OwlCarousel className="owl-theme" {...carousel}>
              {newItems.map((nft) => (
                <div key={nft.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${nft.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={nft.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {nft.expiryDate && <Timer nft={nft} />}

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

                      <Link to={`/item-details/${nft.nftId}`}>
                        <img
                          src={nft.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{nft.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nft.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{nft.likes}</span>
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
