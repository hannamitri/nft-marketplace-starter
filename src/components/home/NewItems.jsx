import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(null);

  function updateTime(milliTerm) {
    const timesLeft = milliTerm - Date.now();
    const seconds = Math.floor(timesLeft / 1000) % 60;
    const minutes = Math.floor(timesLeft / 1000 / 60) % 60;
    const hours = Math.floor(timesLeft / 1000 / 60 / 60) % 24;
    setUpdate(milliTerm - 1000);
    if (milliTerm) {
      if (timesLeft > 0) return hours + "h " + minutes + "m " + seconds + "s ";
      else {
        return <span style={{ color: "gray" }}>Expired</span>;
      }
    } else {
      return <span style={{ color: "gray" }}>Expired</span>;
    }
  }

  useEffect(() => {
    async function main() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItems(data);
      setLoading(false);
    }
    setTimeout(() => {
      main();
    }, 1500);
  }, []);
    
  useEffect(() => {
      setInterval(() => {
        setUpdate(update - 1);
      }, 1000)
    }, [])


  class SimpleSlider extends Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1035,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };

      return (
        <div>
          <Slider {...settings}>
            {!loading
              ? newItems.map((items, index) => {
                  return (
                    <div
                      className="col-lg-3 col-md-6 col-xs-12"
                      style={{}}
                      key={index}
                    >
                      <div
                        style={{
                          width: "300px",
                          paddingRight: "12px",
                          paddingLeft: "12px",
                          maxWidth: "initial",
                          margin: "0 auto",
                        }}
                        className="nft__item"
                      >
                        <div className="author_list_pp">
                          <Link
                            to="/author"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img
                              className="lazy"
                              src={items.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="de_countdown" onChange={(items) => updateTime(items.expiryDate)}>
                          
                        </div>


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
                          <div className="nft__item_price">
                            {items.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{items.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : new Array(7).fill(0).map((_, index) => {
                  return (
                    <div className="col-lg-3 col-md-6 col-xs-12" key={index}>
                      <div
                        style={{
                          width: "300px",
                          paddingRight: "12px",
                          paddingLeft: "12px",
                          maxWidth: "initial",
                          margin: "0 auto",
                        }}
                        className="nft__item"
                      >
                        <div className="author_list_pp">
                          <Link
                            to="/author"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <div
                              className="lazy"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                width: "50px",
                                height: "50px",
                                borderRadius: "100%",
                              }}
                            ></div>
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div
                          className="de_countdown"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            border: "none",
                            width: "40%",
                            height: "28px",
                          }}
                        ></div>
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
                            <div
                              className="lazy nft__item_preview"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                width: "100%",
                                height: "220px",
                              }}
                            ></div>
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <div
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                borderRadius: "5px",
                                width: "100px",
                                height: "20px",
                              }}
                            ></div>
                          </Link>
                          <div
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              borderRadius: "5px",
                              width: "60px",
                              height: "20px",
                              marginTop: "10px",
                            }}
                            className="nft__item_price"
                          ></div>
                          <div className="nft__item_like">
                            <div
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                borderRadius: "5px",
                                width: "30px",
                                height: "20px",
                                marginBottom: "10px",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </Slider>
        </div>
      );
    }
  }

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
          <SimpleSlider />
        </div>
      </div>
    </section>
  );
};

export default NewItems;
