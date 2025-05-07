import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";

const NewItems = () => {
  const [newItemsData, setNewItemsData] = useState([]);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItemsData(response.data.map(item => ({
          ...item,
          timeLeft: calculateTimeLeft(item.expiryDate),
        })));
      } catch (error) {
        console.error("Error fetching new items:", error);
      }
    };

    fetchNewItems();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNewItemsData((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          timeLeft: calculateTimeLeft(item.expiryDate),
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const calculateTimeLeft = (expiryDate) => {
    const now = new Date().getTime();
    const difference = new Date(expiryDate).getTime() - now;

    if (difference <= 0) {
      return "Expired";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const carouselOptions = {
    loop: newItemsData.length > 4,
    margin: 30,
    nav: true, // Enabled navigation arrows
    dots: false, // Disabled dots
    responsive: {
      0: {
        items: 1,
      },
      600: {
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
            {newItemsData.length > 0 ? (
              <OwlCarousel className="owl-theme" {...carouselOptions}>
                {newItemsData.map((item) => (
                  <div className="item" key={item.id}>
                    <div className="nft__item">
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
                            alt={`Author ${item.authorId}`}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">{item.timeLeft}</div>
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/item/${item.nftId}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a
                                href={`https://twitter.com/intent/tweet?url=${window.location.href}/item/${item.nftId}&text=${item.title}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href={`mailto:?subject=Check out this NFT&body=I found this interesting NFT: ${window.location.href}/item/${item.nftId}`}>
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
                ))}
              </OwlCarousel>
            ) : (
              <p>Loading new items...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;