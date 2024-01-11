import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import Countdown from "../utils/Countdown";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  async function fetchNewItems() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(data);
      } catch (error) {
        console.error("Couldn't load", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    }
    
    useEffect(() => {
      fetchNewItems();
    }, []);

    const options = {
      loop: true,
      nav: true,
      dots: false,
      margin: 20,
      responsive: {
        1440: { items: 4 },
        1024: { items: 3 },
        768: { items: 2 },
        375: { items: 1 },
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

          <OwlCarousel className="owl-carousel" {...options}>
            {newItems.length === 0 && isLoading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="col-lg-12 col-md-12 col-xs-12" key={index}>
                    <div className="nft__item nft__item--loading">
                      <div className="nft_wrap nft__wrap--loading">
                        <Skeleton width="100%" height="100%" borderRadius={1} />
                      </div>
                      <div className="nft_item_pp--loading">
                        <Skeleton
                          width="60px"
                          height="60px"
                          borderRadius={999}
                        />
                        <i className="fa fa-check fa-check__loading"></i>
                      </div>
                      <div className="nft__item_info">
                        <div className="margin">
                          <Skeleton width="150px" height="26px" />
                        </div>
                        <div className="margin">
                          <Skeleton width="55px" height="20px" />
                        </div>
                        <div className="nft__item_like--loading">
                          <Skeleton width="34px" height="17.5px" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : newItems.map((newItem) => (
                  <div key={newItem.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${newItem.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img
                            className="lazy"
                            src={newItem.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown"><Countdown expiryDate={newItem.expiryDate} /></div>

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

                        <Link to={`/item-details/${newItem.nftId}`}>
                          <img
                            src={newItem.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${newItem.nftId}`}>
                          <h4>{newItem.title}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {newItem.price} ETH
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{newItem.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
