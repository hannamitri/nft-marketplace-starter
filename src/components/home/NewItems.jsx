import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from "react-owl-carousel2";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";

const NewItems = () => {
  const options = {
    items: 4,
    nav: true,
    dots: false,
    autoplay: false,
    loop: true,
    margin: 20,
    navText: [
      '<span class="custom-prev"></span>',
      '<span class="custom-next"></span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 4,
      },
    },
  };
  const [newItems, setNewItems] = useState([]);

  async function fetchNewItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`,
    );
    setNewItems(data);
  }
  useEffect(() => {
    fetchNewItems();
  }, []);

  const SkeletonCard = () => (
    <div className="nft__item skeleton">
      <div className="author_list_pp">
        <div className="skeleton-avatar"></div>
      </div>

      <div className="de_countdown">
        <div className="skeleton-countdown"></div>
      </div>

      <div className="nft__item_wrap">
        <div className="skeleton-img"></div>
      </div>

      <div className="nft__item_info">
        <div className="skeleton-title"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-likes"></div>
      </div>
    </div>
  );

  const getRemainingTime = (expiryDate) => {
    const now = Date.now();
    const diff = expiryDate - now;
    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { hours, minutes, seconds };
  };

  const CountdownItem = ({ item }) => {
    const expiry = item.expiryDate;

    const [timeLeft, setTimeLeft] = useState(
      expiry ? getRemainingTime(expiry) : { hours: 0, minutes: 0, seconds: 0 },
    );

    useEffect(() => {
      if (!expiry) return;
      const interval = setInterval(() => {
        setTimeLeft(getRemainingTime(expiry));
      }, 1000);

      return () => clearInterval(interval);
    }, [expiry]);

    if (!expiry) return null;

    return (
      <div className="de_countdown">
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
    );
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
          {newItems.length === 0 ? (
            <div className="row">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="col">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : (
            <OwlCarousel options={options}>
              {newItems?.map((item) => (
                <div key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={item.authorId}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <CountdownItem item={item} />

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
                          alt=""
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
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
