import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import TimerCountDown from "./TimerCountDown";
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewItems = ({ newItemsCards }) => {
  useEffect(() => {
    AOS.init();
  }, [])

  const responsive = {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div data-aos="fade-up" className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          { newItemsCards.length ? (
            <OwlCarousel
              className="owl-theme"
              loop
              margin={10}
              nav
              dots={false}
              items={4}
              responsive={responsive}>
              {newItemsCards.map((itemCard) => (
                <div key={itemCard.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${itemCard.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={itemCard.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {itemCard.expiryDate && (
                        <TimerCountDown
                          key={itemCard.id}
                          endTime={itemCard.expiryDate}
                        />
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

                      <Link to={`/item-details/${itemCard.nftId}`}>
                        <img
                          src={itemCard.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{itemCard.title}</h4>
                      </Link>
                      <div className="nft__item_price">{itemCard.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{itemCard.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <div>
              <div className="skeleton-wrapper1">
                <div className="skeleton skeleton-explore"></div>
                <div className="skeleton skeleton-explore"></div>
                <div className="skeleton skeleton-explore"></div>
                <div className="skeleton skeleton-explore"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
};

export default NewItems;
