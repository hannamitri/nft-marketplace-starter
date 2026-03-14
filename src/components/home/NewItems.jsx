import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useNewItems } from "../../hooks/useNewItems";

const useCountdown = (expiryDate) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = new Date(expiryDate) - new Date();
    if (diff <= 0) return "Expired";
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    return `${h}h ${m}m ${s}s`;
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const diff = new Date(expiryDate) - new Date();
      if (diff <= 0) return "Expired";
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      return `${h}h ${m}m ${s}s`;
    };
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  return timeLeft;
};

const NewItemCard = ({ item }) => {
  const timeLeft = useCountdown(item.expiryDate);
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link to={`/author/${item.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top" title={`Creator: ${item.authorName}`}>
          <img className="lazy" src={item.authorImage} alt={item.authorName} />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {item.expiryDate && <div className="de_countdown">{timeLeft}</div>}
      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href="" target="_blank" rel="noreferrer"><i className="fa fa-facebook fa-lg"></i></a>
              <a href="" target="_blank" rel="noreferrer"><i className="fa fa-twitter fa-lg"></i></a>
              <a href=""><i className="fa fa-envelope fa-lg"></i></a>
            </div>
          </div>
        </div>
        <Link to={`/item-details/${item.nftId}`}>
          <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.nftId}`}><h4>{item.title}</h4></Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );
};

const NewItems = () => {
  const { items, loading, error } = useNewItems();

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 4, spacing: 15 },
    breakpoints: {
      "(max-width: 1023px)": { slides: { perView: 3, spacing: 15 } },
      "(max-width: 767px)":  { slides: { perView: 2, spacing: 10 } },
      "(max-width: 639px)":  { slides: { perView: 1, spacing: 10 } },
    },
  });

  if (loading) {
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
            {new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
                  </div>
                  <div className="nft__item_wrap">
                    <div style={{ width: "100%", height: "200px", borderRadius: "8px", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
                  </div>
                  <div className="nft__item_info">
                    <div style={{ width: "120px", height: "16px", borderRadius: "4px", marginBottom: "8px", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
                    <div style={{ width: "80px", height: "14px", borderRadius: "4px", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center" style={{ padding: "60px 0" }}>
              <p>Error: {error}</p>
              <button className="btn-main" onClick={() => window.location.reload()}>Retry</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center" style={{ padding: "60px 0" }}>
              <p>No new items available.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12" style={{ position: "relative" }} data-aos="fade-up" data-aos-delay="100">

            <button
              onClick={() => instanceRef.current?.prev()}
              style={{ position: "absolute", left: "-25px", top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "none", border: "none", cursor: "pointer", fontSize: "24px", color: "#333" }}
              aria-label="Previous slide"
            >
              <i className="fa fa-angle-left"></i>
            </button>

            <div ref={sliderRef} className="keen-slider">
              {items.map((item) => (
                <div className="keen-slider__slide" key={item.id}>
                  <NewItemCard item={item} />
                </div>
              ))}
            </div>

            <button
              onClick={() => instanceRef.current?.next()}
              style={{ position: "absolute", right: "-25px", top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "none", border: "none", cursor: "pointer", fontSize: "24px", color: "#333" }}
              aria-label="Next slide"
            >
              <i className="fa fa-angle-right"></i>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;