import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton"; // Adjust relative folder path as needed
import Countdown from "../UI/Countdown";   // Adjust relative folder path as needed

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        if (!response.ok) throw new Error("Network response error");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error pulling live data from the newItems API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 }
    }
  };

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

          {/* 1. SKELETON SHIMMER LOADING GRID STATE */}
          {loading ? (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="225px" borderRadius="8px" />
                  </div>
                  <div className="nft__item_info" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <Skeleton width="60%" height="18px" borderRadius="4px" />
                    <Skeleton width="40%" height="14px" borderRadius="4px" />
                  </div>
                </div>
              </div>
            ))
          ) : (

            /* 2. LIVE DYNAMIC CARD CAROUSEL STATE */
            <div className="col-lg-12">
              {items.length > 0 && (
                <OwlCarousel className="owl-theme" {...carouselOptions}>
                  {items.map((item) => (
                    <div className="item" key={item.id}>
                      <div className="nft__item">
                        
                        {/* Dynamic Creator Link Header Row */}
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Creator: ${item.title}`} // Optional template hover title
                          >
                            <img className="lazy" src={item.authorImage} alt="Author avatar" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        {/* Custom Self-Ticking Countdown Element */}
                        <Countdown expiryDate={item.expiryDate} />

                        {/* Image Preview & Share Context Overlay Area */}
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

                        {/* Footer Info: Title, Pricing, and Social Metric Blocks */}
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
                  ))}
                </OwlCarousel>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default NewItems;