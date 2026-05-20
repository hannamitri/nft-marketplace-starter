import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const carouselOptions = {
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    1200: { items: 4 },
  },
};

function CountDown({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    function calc() {
      const diff = expiryDate - Date.now();
      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    }

    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [expiryDate]);

  if (!expiryDate) return null;
  return <div className="de_countdown">{timeLeft}</div>;
}

const SkeletonCard = () => (
  <div className="nft__item">
    <div className="author_list_pp">
      <Skeleton width="50px" height="50px" borderRadius="50%" />
    </div>
    <div className="nft__item_wrap">
      <Skeleton width="100%" height="200px" borderRadius="10px" />
    </div>
    <div className="nft__item_info">
      <Skeleton width="120px" height="18px" borderRadius="4px" />
      <br />
      <Skeleton width="80px" height="14px" borderRadius="4px" />
    </div>
  </div>
);

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const carouselItems = loading
    ? new Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
    : items.map((item) => (
        <div className="nft__item" key={item.id}>
          <div className="author_list_pp">
            <Link
              to={`/author?author=${item.authorId}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={`Creator: ${item.title}`}
            >
              <img className="lazy" src={item.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>

          <CountDown expiryDate={item.expiryDate} />

          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a href=" " target="_blank" rel="noreferrer">
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href=" " target="_blank" rel="noreferrer">
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href=" ">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>
            <Link to={`/item-details?nftId=${item.nftId}`}>
              <img
                src={item.nftImage}
                className="lazy nft__item_preview"
                alt={item.title}
              />
            </Link>
          </div>

          <div className="nft__item_info">
            <Link to={`/item-details?nftId=${item.nftId}`}>
              <h4>{item.title}</h4>
            </Link>
            <div className="nft__item_price">{item.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{item.likes}</span>
            </div>
          </div>
        </div>
      ));

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12" data-aos="fade-up">
            <OwlCarousel className="owl-theme" {...carouselOptions}>
              {carouselItems}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
