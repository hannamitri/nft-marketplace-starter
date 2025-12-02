import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../UI/apiFetch";
import OwlCarousel from "react-owl-carousel";
import CountdownTimer from "../UI/countdownTimer";
import Skeleton from "../UI/Skeleton";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function NewItems() {
  const { data, loading,} = useFetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
  
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      450: {
        items: 2
      },
      950: {
        items: 3
      },
      1400: {
        items: 4
      }
    }
  };
  
  
  return (
    <div data-aos="fade-up">
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
            <OwlCarousel className="owl-theme" key="loading" {...options}>
              {new Array(8).fill(0).map((_, index) => (
                <div key={index} style={{ maxWidth: "350px", margin: "0 auto" }}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="de_countdown">
                      <Skeleton width="100px" height="20px" borderRadius="4px" />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton width="100%" height="300px" borderRadius="8px" />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width="60%" height="20px" borderRadius="4px" />
                      <Skeleton width="40%" height="15px" borderRadius="4px" />
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="owl-theme" key="loaded" {...options}>
            {data && data.map((newItems) => (
              <div key={newItems.id} style={{ maxWidth: "350px", margin: "0 auto" }}>
                <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${newItems.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                    >
                    <img className="lazy" src={newItems.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <CountdownTimer expiryDate={newItems.expiryDate} />

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
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${newItems.nftId}`}>
                    <h4>{newItems.title}</h4>
                  </Link>
                  <div className="nft__item_price">{newItems.price} ETH</div>
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
   </div>
  );
};



export default NewItems;
