import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Countdown from "../Countdown";

import AOS from "aos";
import 'aos/dist/aos.css';


const NewItems = () => {

  AOS.init()

  const [newItems, setnewItems] = useState(new Array(6).fill("0"));
  const [isLoading, setIsLoading] = useState(true); // set initial value to true

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((res) => {
        setnewItems(res.data);
        setIsLoading(false); // set to false after getting data
      });
  }, [isLoading]);

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

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up" data-aos-duration="4000">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl-rtl" {...options} data-aos="fade-up" data-aos-duration="4000">
            {newItems.map((_, index) => (
              <div key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    {isLoading ? (
                      <>
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            margin: "5px",
                          }}
                        ></div>
                        <i className="fa fa-check"></i>
                      </>
                    ) : (
                      <Link
                        to={`/author/${_.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={_.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    )}
                  </div>

                  {isLoading ? <></> : <Countdown expiry={`${_.expiryDate}`} />}


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

                    {isLoading ? (
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100%",
                          height: "350px",
                        }}
                      ></div>
                    ) : (
                      <Link to={`/item-details/${_.nftId}`}>
                        <img
                          src={_.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    )}
                  </div>
                  <div className="nft__item_info">
                    {isLoading ? (
                      <div
                        className="skeleton-box"
                        style={{
                          width: "180px",
                          height: "30px",
                          marginTop: "4px",
                        }}
                      ></div>
                    ) : (
                      <Link to={`/item-details/${_.nftId}`}>
                        <h4>{_.title}</h4>
                      </Link>
                    )}
                    {isLoading ? (
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100px",
                          height: "20px",
                        }}
                      ></div>
                    ) : (
                      <div className="nft__item_price">{_.price} ETH</div>
                    )}
                    {isLoading ? (
                      <div
                        className="skeleton-box"
                        style={{
                          position: "absolute",
                          width: "30px",
                          height: "15px",
                          right: 0,
                        }}
                      ></div>
                    ) : (
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{_.likes}</span>
                      </div>
                    )}
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
