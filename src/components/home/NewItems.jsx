import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Timer from "../UI/Timer";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import Skeleton from "../UI/Skeleton";
import 'swiper/css';
import 'swiper/css/navigation';
import '../../css/styles/arrows.css'

const NewItems = () => {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    setItems(data);
    setLoading(false);
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
          <Swiper
            navigation={true}
            loop={true}
            spaceBetween={10}
            slidesPerView={1}
            allowTouchMove={false}
            breakpoints={{
              400: {
                slidesPerView: 2
              },
              750: {
                slidesPerView: 3
              },
              975: {
                slidesPerView: 4
              }
            }}
            modules={[Navigation]}
          >
            {loading ?
              new Array(4).fill(0).map((_, index) => (
                <SwiperSlide key={index}>
                  <div>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <Skeleton
                            width={280}
                            height={280}
                            borderRadius={10}
                          />
                        </Link>
                      </div>
                      <div className="de_countdown">5h 30m 32s</div>
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
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>
                          <Skeleton 
                            height={16}
                            width={100}
                            borderRadius={4}
                          /> 
                          </h4>
                        </Link>
                        <div className="nft__item_price">
                          <Skeleton 
                            height={16}
                            width={50}
                            borderRadius={4}
                          /> 
                        </div>
                        <div className="nft__item_like">
                        <Skeleton 
                            height={16}
                            width={50}
                            borderRadius={4}
                          /> 
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
              : items.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="" >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate &&
                        <div className="de_countdown">
                          <Timer endTimeInput={item.expiryDate} />
                        </div>
                      }
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

                        <Link to={`item-details/${item.nftId}`}>
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
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default NewItems;