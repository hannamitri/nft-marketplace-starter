import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import Countdown from "react-countdown";
import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const NewItems = () => {
  const [items, setItems] = useState([]);
  
  const options = {
    margin: 5,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    smartSpeed: 500,
    loop: true,
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

  const calMilisecond = (time) => {
    return time - Date.now();
  };

  useEffect(() => {
    
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => {
        setItems(res.data);
        
      })
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
              {items.map((item) => (
                <div
                  data-aos="fade-zoom-in"
                  data-aos-easing="ease-in-back"
                  data-aos-delay="0"
                  data-aos-duration="800"
                  data-aos-offset="0"
                  key={item.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={item.title}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate ? (
                      <div className="de_countdown">
                        {calMilisecond(item.expiryDate) > 0 ? (
                          <>
                            <Countdown date={item.expiryDate} />
                          </>
                        ) : (
                          <>Expired</>
                        )}
                      </div>
                    ) : (
                      <></>
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
              ))}
            </OwlCarousel>
          ) : (
            <>
              {new Array(4).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton
                        width={`50px`}
                        height={`50px`}
                        borderRadius={`50%`}
                      />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton
                        width={`100%`}
                        height={`320px`}
                        borderRadius={`50px`}
                      />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width={`90px`} height={`20px`} />
                      <div className="nft__item_price">
                        <Skeleton width={`75px`} height={`20px`} />
                      </div>
                      <div className="nft__item_like">
                        <Skeleton width={`50px`} height={`20px`} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
