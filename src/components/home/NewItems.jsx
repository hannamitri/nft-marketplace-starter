import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SkeletonAll from "../UI/SkeletonAll"; // ✅ Import adaptive skeleton


const NewItems = () => {

  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNewItems() {
    
      const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
      console.log(data)
      setCard(data);
      setTimeout(() => setLoading(false),2000); 
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

  // Countdown formatter
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const [timeLeft, setTimeLeft] = useState([]);

  useEffect(() => {
    if (!loading && card.length > 0) {
      const countdowns = card.map((item) => {
        if (item.expiryDate) {
          return Math.floor((new Date(item.expiryDate) - new Date()) / 1000);
        }
        
        return 5 * 3600 + 30 * 60 + 32; // fallback
      });

      setTimeLeft(countdowns);

      const interval = setInterval(() => {
        setTimeLeft((prev) => prev.map((time) => (time > 0 ? time - 1 : 0)));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [loading, card]);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              1024: { slidesPerView: 4 },
              768: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
          >

        {loading ? 
          
            Array.from({ length: 8 }).map((_, index) => (
               <SwiperSlide key={index}>
             <SkeletonAll type="item" />
              </SwiperSlide>
            ))
         
         : 
          
            card.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}  title={`Creator: ${item.authorName}`}>
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">
                    {timeLeft[index] !== undefined
                      ? formatTime(timeLeft[index])
                      : "0h 0m 0s"}
                  </div>
                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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
              </SwiperSlide>
            ))

          }
          
          </Swiper>
        </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
