import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CountDown from "../CountDown"; // Live CountDown
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchTime, setFetchTime] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => res.json())
      .then((data) => {
        const endTime = performance.now();
        setFetchTime(((endTime - startTime) / 1000).toFixed(2));
        setItems(data);
        setLoading(false);
        console.log("Fetched New Items:", data);
      })
      .catch((err) => {
        console.error("API fetch error:", err);
        setLoading(false);
      });
  }, []);

  const renderSkeletons = (count) =>
    new Array(count).fill(0).map((_, index) => (
      <SwiperSlide key={index}>
        <div className="nft_item skeleton">
          <div className="skeleton-img" />
          <div className="skeleton-line short" />
          <div className="skeleton-line thinner" />
        </div>
      </SwiperSlide>
    ));

  return (
    <section id="section-new-items" className="no-bottom">
      <div className="container">
        <div className="text-center mb-4">
          <h2>New Items</h2>
          <p className="fetch-time">Fetch Time: {fetchTime} seconds</p>
          <div className="small-border bg-color-2"></div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {loading
            ? renderSkeletons(4)
            : items.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="nft_item">
                    <div className="nft_image position-relative">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          alt={item.title}
                          className="img-fluid"
                        />
                      </Link>
                      {item.expiryDate && (
                        <CountDown expiryDate={item.expiryDate} />
                      )}
                    </div>
                    <div className="nft_info text-center mt-3">
                      <h4>{item.title}</h4>
                      <span>
                        {item.price ? `${item.price} ETH` : "Price not listed"}
                      </span>
                      <div className="likes">{item.likes || 0}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewItems;