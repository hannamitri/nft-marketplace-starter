import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(
    Math.floor((expiryDate - Date.now()) / 1000),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft <= 0) return null;

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="de_countdown">
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      1024: { items: 4 },
    },
  };

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const skeletonCount =
    viewportWidth < 480
      ? 1
      : viewportWidth < 768
        ? 2
        : viewportWidth < 1024
          ? 3
          : 4;

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(API_URL);
        setItems(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCollections();
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
          {loading ? (
            <OwlCarousel key="loading" {...options}>
              {Array(skeletonCount)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton
                        height="50px"
                        width="50px"
                        borderRadius="50%"
                      />
                      <i className="fa fa-check"></i>
                    </div>
                    <div>
                      <Skeleton width="100%" height="350px" />
                    </div>
                    <div className="nft__item_info">
                      <h4>
                        <Skeleton width="140px" height="25px" />
                      </h4>
                      <div className="nft__item_price">
                        <Skeleton width="50px" height="15px" />
                      </div>
                      <div className="nft__item_like">
                        <Skeleton width="15px" height="10px" />
                      </div>
                    </div>
                  </div>
                ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel key="loaded" {...options}>
              {items.map((item) => (
                <div key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <Countdown expiryDate={item.expiryDate} />
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
                          src={item.nftImage}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
