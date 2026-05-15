import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { enrichWithAuthorData, topSellersUrl } from "../../utils/authorUtils";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NewItems = () => {

  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    async function getNewItems() {
      try {
        const [itemsResponse, sellersResponse] = await Promise.all([
          axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"),
          axios.get(topSellersUrl),
        ]);

        setItems(enrichWithAuthorData(itemsResponse.data, sellersResponse.data));
      } catch (error) {
        console.error("New items API error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getNewItems();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getCountdown(expiryDate) {
    const timeLeft = expiryDate - now;

    if (timeLeft <= 0) {
      return "00:00:00";
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return [hours, minutes, seconds]
      .map(time => String(time).padStart(2, "0"))
      .join(":");
  }

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
          {error && <p>API error: {error}</p>}

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            passiveListeners={true}
            touchStartPreventDefault={false}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              1000: { slidesPerView: 4 },
            }}
          >
            {loading && new Array(4).fill(0).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="230px" borderRadius="8px" />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width="70%" height="24px" borderRadius="4px" />
                    <Skeleton width="45%" height="18px" borderRadius="4px" />
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {!loading && items.map(item => (
              <SwiperSlide key={item.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${item.authorId || item.id}`}
                      state={{ author: item }}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Creator: ${item.authorName || `Author #${item.authorId}`}`}
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {item.expiryDate && (
                    <div className="de_countdown">
                      {getCountdown(item.expiryDate)}
                    </div>
                  )}

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

                    <Link to={`/item-details/${item.id}`} state={{ item }}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.id}`} state={{ item }}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price}</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
