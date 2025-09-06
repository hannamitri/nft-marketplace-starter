
import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Link } from "react-router-dom";

const skeletonArray = [1, 2, 3, 4];

function ItemSlide({ item, now }) {
  return (
    <div className="keen-slider__slide">
      <Link
        to={`/item-details/${item.nftId}`}
        state={{ itemData: item }}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className="nft_coll" style={{ cursor: 'pointer' }}>
          <div className="nft_wrap">
            <img src={item.nftImage} className="lazy img-fluid" alt="" />
            <div className="de_countdown">
              {formatTime(item.expiryDate - now)}
            </div>
          </div>
          <div className="nft_coll_pp">
            <img className="lazy pp-coll" src={item.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <h4>{item.title}</h4>
            <span>{item.price} ETH</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function SkeletonSlide({ index }) {
  return (
    <div className="keen-slider__slide" key={index}>
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
  );
}

// Helper to format time
function formatTime(ms) {
  if (ms <= 0) return "00h 00m 00s";
  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}h ${m}m ${s}s`;
}

const ItemDetailsInline = ({ item }) => {
  if (!item) return null;
  return (
    <section aria-label="section" className="mt90 sm-mt-0">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={item.nftImage}
              className="img-fluid img-rounded mb-sm-30 nft-image"
              alt={item.title}
            />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              <h2>{item.title}</h2>
              <div className="item_info_counts">
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>
                  {item.views || Math.floor(Math.random() * 200) + 50}
                </div>
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>
                  {item.likes}
                </div>
              </div>
              <p>
                {`This unique NFT "${item.title}" is part of an exclusive collection featuring distinctive digital artwork.`}
              </p>
              <div className="d-flex flex-row">
                <div className="mr40">
                  <h6>Owner</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      {`Owner ${item.authorId?.toString().slice(-4) || ''}`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="de_tab tab_simple">
                <div className="de_tab_content">
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      {`Artist ${item.authorId?.toString().slice(-4) || ''}`}
                    </div>
                  </div>
                </div>
                <div className="spacer-40"></div>
                <h6>Price</h6>
                <div className="nft-item-price">
                  <span>{item.price} ETH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewItems = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 10 },
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
          <div style={{ position: 'relative' }}>
            <button
              className="keen-arrow keen-arrow--left"
              style={{ position: 'absolute', left: 0, top: '40%', zIndex: 2 }}
              onClick={() => instanceRef.current && instanceRef.current.prev()}
              aria-label="Previous"
            >
              &#8592;
            </button>
            <button
              className="keen-arrow keen-arrow--right"
              style={{ position: 'absolute', right: 0, top: '40%', zIndex: 2 }}
              onClick={() => instanceRef.current && instanceRef.current.next()}
              aria-label="Next"
            >
              &#8594;
            </button>
            <div ref={sliderRef} className="keen-slider">
              {loading
                ? skeletonArray.map((_, idx) => (
                    <SkeletonSlide key={idx} index={idx} />
                  ))
                : items.slice(0, 4).map((item, idx) => (
                    <ItemSlide key={idx} item={item} now={now} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;