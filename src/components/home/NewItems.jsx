import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Countdown from "../CountDown";
import AOS from "aos";
import "aos/dist/aos.css";

const NewItems = () => {
  const [nftItems, setNftItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNftItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNftItems(data);
    setLoading(false);
  }

  const sliderSettings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  AOS.init({
    easing: "ease",
    duration: 800,
    delay: 500,
  });

  useEffect(() => {
    fetchNftItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-in">New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (

            <Slider {...sliderSettings}>
                {new Array(4).fill(0).map((_, index) => (
                  <div
                    className="nft__item__skeleton shimmer"
                    key={index}
                  >
                    <div className="author_list_pp">
                      <div className="lazyload__img shimmer"></div>
                      <i className="fa fa-check"></i>
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
                    </div>
                  </div>
                ))}
              </Slider>
          ) : (
            <div className="slider-container" data-aos="fade-in">
            <Slider {...sliderSettings}>
              {nftItems.map((nftItem, index) => (
                <div className="nft__item"  key={index}>
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${nftItem.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={nftItem.title}
                    >
                      <img className="lazy" src={nftItem.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {nftItem.expiryDate && (
                    <Countdown expiryDate={nftItem.expiryDate} />
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

                    <Link to={`/item-details/${nftItem.nftId}`}>
                      <img
                        src={nftItem.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${nftItem.nftId}`}>
                      <h4>{nftItem.title}</h4>
                    </Link>
                    <div className="nft__item_price">{nftItem.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nftItem.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
