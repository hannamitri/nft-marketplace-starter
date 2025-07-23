import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Link } from "react-router-dom";

const skeletonArray = [1, 2, 3, 4];

// Helper to format time
function formatTime(ms) {
  if (ms <= 0) return "00h 00m 00s";
  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}h ${m}m ${s}s`;
}

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 16 },
  });

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Update the timer every second
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="section-new-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>
          <div ref={sliderRef} className="keen-slider">
            {loading
              ? skeletonArray.map((_, idx) => (
                  <div className="keen-slider__slide" key={idx}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div className="skeleton skeleton-img" style={{ width: "100%", height: "200px", borderRadius: "8px" }}></div>
                      </div>
                      <div className="nft_coll_pp">
                        <div className="skeleton skeleton-avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <div className="skeleton skeleton-title" style={{ width: "60%", height: "20px", marginBottom: "8px" }}></div>
                        <div className="skeleton skeleton-code" style={{ width: "40%", height: "16px" }}></div>
                      </div>
                    </div>
                  </div>
                ))
              : items.map((item, idx) => (
                  <div className="keen-slider__slide" key={idx}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img src={item.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                        {/* Countdown Timer */}
                        <div className="de_countdown">
                          {formatTime(item.expiryDate - now)}
                        </div>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img className="lazy pp-coll" src={item.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title}</h4>
                        </Link>
                        <span>{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;