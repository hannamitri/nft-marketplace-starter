import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton"; 

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load items. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    return () => controller.abort();
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
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <OwlCarousel 
            className="owl-theme" 
            items={4} 
            nav 
            dots={false} 
            margin={16} 
            loop
            key={loading ? "loading" : items.length}
            responsive={{
              0: { items: 1 },
              600: { items: 2 },
              992: { items: 3 },
              1200: { items: 4 },
            }}
            >
            {loading ? (
              Array.from({ length: 7 }).map((_, index) => (
                <div className="item" key={index}>
                  <Skeleton width="100%" height="200px" borderRadius="10px" />
                </div>
              ))
            ) : (
              items.map((item) => (
                <div className="item" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate > Date.now() && (
                      <div className="de_countdown">
                      <CountdownTimer expiryDate={item.expiryDate} />
                    </div>
                    )}
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} loading="lazy" />
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
              ))
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(expiryDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(timer); 
          return 0; 
        }
        return prev - 1000; 
      });
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return timeLeft > 0 ? <span>{formatTime(timeLeft)}</span> : null;
};

export default NewItems;