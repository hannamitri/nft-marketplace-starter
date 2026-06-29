import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import Countdown from "../Countdown";

const NewItems = ({ loading, newItems = [] }) => {


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
          
          {loading ? (
          <>
            {new Array(7).fill(0).map((_, i) => (
            <div 
            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ width: "100%", maxWidth: "100%", padding: "0" }}
            key={i}
            >
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Skeleton width="100%" height="200px" />
                </div>
                <div className="nft_coll_pp">
                  <Skeleton
                    width="50px"
                    height="50px"
                    borderRadius="50%"
                  />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Skeleton width="100px" height="20px" />
                  <br />
                  <Skeleton width="60px" height="20px" />
                </div>
              </div>
            </div>
            ))}
            </>
            ) : newItems.length > 0 ? (
              <OwlCarousel
                className="owl-theme"
                loop
                data-aos="fade-up"
                data-aos-duration="700"
                nav
                key={loading}
                dots={false}
                margin={8}
                navText={["<", ">"]}
                responsive={{
                0: { items: 1 },
                572: { items: 2 },
                992: { items: 3 },
                1200: { items: 4 },
                }}
              >
                {newItems.map((item, index) => (
                  <div className="col-xs-12" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate && (
                        <div className="de_countdown">
                          <Countdown expiryDate={item.expiryDate} />
                        </div>
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

                        <Link to="/item-details">
                          <img
                            src={item.nftImage || nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
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
            ) : null}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
