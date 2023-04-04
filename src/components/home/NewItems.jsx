import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import Counter from "../UI/Counter";

const options = {
  items: 4,
  margin: 10,
  responsiveClass: true,
  nav: true,
  loop: true,
  dots: false,
  responsive: {
    1200: {
      items: 4,
    },
    1000: {
      items: 3,
    },
    575: {
      items: 2,
    },
    0: {
      items: 1,
    },
  },
};

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchNFT() {
    setLoading(false);
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    console.log(response.data)
    setNewItems(response.data);
    setLoading(true);
  }

  useEffect(() => {
    fetchNFT();
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
            <OwlCarousel className={"owl-theme"} {...options}>
              <div>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton
                      width={"50px"}
                      height={"50px"}
                      borderRadius={"50%"}
                    />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="de_countdown">5h 30m 32s</div>

                  <div className="nft__item_wrap">
                    <Skeleton
                      width={"100%"}
                      height={"200px"}
                      borderRadius={"8px"}
                    />
                    <img src="" className="lazy nft__item_preview" alt="" />
                  </div>
                  <div className="nft__item_info">
                    <h4>
                      <Skeleton
                        width={"100px"}
                        height={"20px"}
                        borderRadius={"4px"}
                      />
                    </h4>
                    <div className="nft__item_price">
                      <Skeleton
                        width={"50px"}
                        height={"20px"}
                        borderRadius={"4px"}
                      />
                    </div>
                    <div className="nft__item_like">
                      <span>
                        <Skeleton
                          width={"16px"}
                          height={"16px"}
                          borderRadius={"4px"}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          ) : (
            <OwlCarousel className={"owl-theme"} {...options}>
              {newItems.map((newItems) => (
                <div key={newItems.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${newItems.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img
                          className="lazy"
                          src={newItems.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {newItems.expiryDate !== null && (
                      <Counter item={newItems} />
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

                      <Link to={`/item-details/${newItems.nftId}`}>
                        <img
                          src={newItems.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{newItems.title}</h4>
                      </Link>
                      <div className="nft__item_price">
                        {newItems.price} ETH
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{newItems.likes}</span>
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
