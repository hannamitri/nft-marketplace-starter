import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Countdown from "../UI/Countdown";

import SkeletonCard from "../UI/SkeletonCard";

const NewItems = () => {
  const [items, setItems] = useState([]);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
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

 

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => {
        setItems(res.data);
      });
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
          {items.length ? (
            <OwlCarousel className="owl-theme" {...options}>
              {items.map((item, id) => (
                
                  <div className="nft__item" key={id}>
                    <div className="author_list_pp">
                      <Link
                       to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={item.title}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && (
              <Countdown expiryDate={item.expiryDate} />
            )}
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <Link to="/" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </Link>
                            <Link to="/" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </Link>
                            <Link to="/">
                              <i className="fa fa-envelope fa-lg"></i>
                            </Link>
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
                      <Link to={`item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
               
              ))}
            </OwlCarousel>
          ) : (
            <>
            {new Array(4).fill(0).map((_, index) => <SkeletonCard key={index} />)}
          </>
        )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
