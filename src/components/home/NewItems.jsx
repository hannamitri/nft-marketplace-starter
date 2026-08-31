import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch items from API
  async function fetchNewItems() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setItems(data);
    } catch (error) {
      console.error("Error fetching new items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

  // 2. Format expiry timer (seconds to HH:MM:SS)
  function formatCountdown(expiryDate) {
    if (!expiryDate) return null;
    const millisLeft = expiryDate - Date.now();
    if (millisLeft <= 0) return "Expired";

    const totalSeconds = Math.floor(millisLeft / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  // 3. Carousel configuration options
  const owlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
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

          <div className="col-lg-12">
            {loading ? (
              /* --- SKELETON STATE --- */
              <OwlCarousel className="owl-theme" {...owlOptions}>
                {new Array(4).fill(0).map((_, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <Skeleton
                        width="50px"
                        height="50px"
                        borderRadius="50%"
                      />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton
                        width="100%"
                        height="250px"
                        borderRadius="8px"
                      />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton
                        width="100px"
                        height="20px"
                        borderRadius="4px"
                      />
                      <div className="nft__item_price">
                        <Skeleton
                          width="60px"
                          height="15px"
                          borderRadius="4px"
                        />
                      </div>
                      <div className="nft__item_like">
                        <Skeleton
                          width="30px"
                          height="15px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              /* --- LOADED STATE --- */
              /* Adding key={items.length} forces OwlCarousel to re-initialize 
                 once API data populates, fixing the invisible/empty card issue. */
              items.length > 0 && (
                <OwlCarousel
                  key={items.length}
                  className="owl-theme"
                  {...owlOptions}
                >
                  {items.map((item) => (
                    <div className="nft__item" key={item.id || item.nftId}>
                      {/* Author Profile Image */}
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.authorId}`}
                        >
                          <img
                            className="lazy"
                            src={item.authorImage}
                            alt={item.title}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {/* Expiry Countdown Timer Badge */}
                      {item.expiryDate && (
                        <div className="de_countdown">
                          {formatCountdown(item.expiryDate)}
                        </div>
                      )}

                      {/* NFT Main Image */}
                      <div className="nft__item_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title}
                          />
                        </Link>
                      </div>

                      {/* NFT Info & Likes */}
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {item.price} ETH
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;