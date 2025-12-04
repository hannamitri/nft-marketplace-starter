import React, { useState, useEffect } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Tooltip } from "bootstrap";
import { Link } from "react-router-dom";


const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

 useEffect(() => {
  const interval = setInterval(() => {
    setItems(items => [...items]); 
  }, 1000);

  return () => clearInterval(interval);
}, []);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setItems(data);
      } catch (err) {
        console.error("error fetching new items:", err);
      } finally {
        setLoading(false);
      }
    };

    
    fetchItems();
  }, []);
  
  useEffect(() => {
  if (!loading) {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach((elem) => new Tooltip(elem));
  }
}, [loading]);


  const getRemainingTime = (expiryDate) => {
    const now = Date.now();
    const timeLeft = expiryDate - now;

    if (timeLeft <= 0) return "00h :00m :00s";

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${hours}h : ${minutes}m : ${seconds}s`;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section data-aos="fade up" id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>
        <div className="new-items-slider mt-4">
          {loading ? (
            <div className="skeleton-wrapper">
              {[1, 2, 3, 4].map((i) => (
                <div className="skeleton-card" key={i}>
                  <div className="skeleton-img"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-author"></div>
                  <div className="skeleton-code"></div>
                </div>
              ))}
            </div>
          ) : (
            <Slider {...settings}>
              {items.map((item, index) => {
                return (
                  <div key={item.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId || item.id}`}
                          
                          title={`Creator: User #${item.authorId}`}
                          >
                          <img className="lazy" src={item.authorImage} alt={item.author} />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">
                        {getRemainingTime(item.expiryDate)}
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
  
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title}
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
                )
              })}
                </Slider>

                
                
              )}
        </div>
      </div>
      </section>
    );
};

export default NewItems;
