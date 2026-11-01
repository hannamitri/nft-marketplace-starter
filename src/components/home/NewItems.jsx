import React from "react";
import Countdown from "../Universal/Countdown";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "./Carousel";

import Aos from "aos";
import 'aos/dist/aos.css';

const NewItems = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [now, setNow] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let active = true;
    
    axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    )
    .then(({data}) => {
      if (active) {
        console.log(data);
        setNewItems(data);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch new items:", error);
        })
        .finally(() => {
          if (active) {
            setLoading(false);
          }
        });
  
      return () => {
        active = false;
      };
    }, []); 
  const showPlaceholders = loading || newItems.length === 0;
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div data-aos="fade-up">
          <Carousel key={showPlaceholders ? "loading" : "loaded"}>
            {showPlaceholders && (
              Array.from({ length: 8 }, (_, index) => (
                    <div className="item" key={index}>
                      <div className="nft_coll skeleton-card">
                        <div className="nft_wrap">
                          <div className="skeleton skeleton-image"></div>
                        </div>

                        <div className="nft_coll_pp">
                          <div className="skeleton skeleton-avatar"></div>
                          <i className="fa fa-check"></i>
                        </div>

                        <div className="nft_coll_info">
                          <div className="skeleton skeleton-title"></div>
                          <div className="skeleton skeleton-subtitle"></div>
                        </div>
                      </div>
                    </div>
          
                  ))
            )}
    
            {!showPlaceholders &&
              newItems.map((item, index) => (
            <div key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${item.authorId}`}
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate &&
                <div className="de_countdown">
                  <Countdown expiryDate={item.expiryDate} now={now} />
                </div>}

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

                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </Carousel>
        </div>
      </div>
    </div>

    </section>
  );
};

export default NewItems;
