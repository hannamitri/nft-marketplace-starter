import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import NewItemCard from "../UI/NewItemCard";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
    }, 2000);
  }, []);

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
                      className="col-lg-3 col-md-6 col-xs-12 extra-style"
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
                        <NewItemCard
                          key={items.id}
                          nftId={items.nftId}
                          nftImage={items.nftImage}
                          authorImage={items.authorImage}
                          likes={items.likes}
                          price={items.price}
                          title={items.title}
                          authorId={items.authorId}
                          expiryDate={items.expiryDate}
                        />
                      </div>
                    </div>
                  );
                })
              : new Array(7).fill(0).map((_, index) => {
                  return (
                    <div
                      className="col-lg-3 col-md-6 col-xs-12 extra-style"
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
                          <div
                            className="lazy skeleton-box"
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              width: "50px",
                              height: "50px",
                              borderRadius: "100%",
                            }}
                          ></div>
                          <i className="fa fa-check"></i>
                        </div>
                        <div
                          className="de_countdown skeleton-box"
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

                          <div
                            className="lazy nft__item_preview skeleton-box"
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              width: "100%",
                              height: "220px",
                              margin: "0 auto",
                            }}
                          ></div>
                        </div>
                        <div className="nft__item_info">
                          <div
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              borderRadius: "5px",
                              width: "100px",
                              height: "20px",
                            }}
                          ></div>
                          <div
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              borderRadius: "5px",
                              width: "60px",
                              height: "20px",
                              marginTop: "10px",
                            }}
                            className="nft__item_price skeleton-box"
                          ></div>
                          <div className="nft__item_like">
                            <div
                              className="skeleton-box"
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
            <div
              data-aos="fade-in"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-offset="300"
            >
              <div className="text-center">
                <h2>New Items</h2>
                <div
                  style={{ height: "2.5px" }}
                  className="small-border bg-color-2"
                ></div>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
            data-aos-offset="400"
          >
            <SimpleSlider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
