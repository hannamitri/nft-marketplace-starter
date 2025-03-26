import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const SkeletonLoader = () => (
  <div className="nft__item">
    <div className="skeleton-check-image">
      <i className="fa fa-check"></i>
      <div className="skeleton-box skeleton-image-fluid"></div>
      <div className="skeleton-pp-coll skeleton-box"></div>
    </div>
    <div className="skeleton-art-title skeleton-box"></div>
    <div className="price-likes-display">
      <div className="skeleton-title skeleton-box"></div>
      <div className="skeleton-likes-title skeleton-box"></div>
    </div>
  </div>
);

const CountdownTimer = memo(({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("EXPIRED");

  useEffect(() => {
    if (!expiryDate) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const expiryTime = new Date(expiryDate).getTime();
      const timeDiff = expiryTime - now;

      if (timeDiff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hours = String(Math.floor((timeDiff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
      const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, "0");
      const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, "0");
      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

 
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); 
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
});

const NewItems = () => {
  const [itemsCarousel, setItemsCarousel] = useState([]);
  const [loading, setLoading] = useState(true);

  async function newItemsData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItemsCarousel(data);
    setLoading(false);
  }

  useEffect(() => {
    newItemsData();
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
            <OwlCarousel className="owl-theme" loop margin={10} nav items={4}>
              {Array(4)
                .fill()
                .map((_, index) => (
                  <div key={index}>
                    <SkeletonLoader />
                  </div>
                ))}
            </OwlCarousel>
          ) : (
            <>
            <OwlCarousel className="owl-theme" loop margin={10} nav items={4}>
              {itemsCarousel.map((item, index) => (
                <div className="item" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.creatorName}`}
                      >
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <CountdownTimer expiryDate={item.expiryDate} />
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
