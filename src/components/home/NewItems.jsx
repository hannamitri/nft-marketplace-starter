import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ShimmerEffect from "../UI/ShimmerEffect";

const useCountdown = (targetDate) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = new Date(targetDate).getTime() - now.getTime();

      if (distance < 0) {
        clearInterval(interval);
        // Here we don't set countdown to "00:00:00", we just leave it as an empty string
        setCountdown("");
        return;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
};

const Item = ({ item }) => {
  const countdown = useCountdown(item.expiryDate);
  return (
    <div className="item">
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to="/author"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={item.title}
          >
            <img className="lazy" src={item.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        <div className="nft__item_wrap">
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
          {countdown && <div className="de_countdown">{countdown}</div>}
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(response.data);
        setIsLoading(false); // This should be set to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Also set to false in case of an error
      }
    };

    fetchData();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
      1200: { items: 4 },
    },
  };

  const renderShimmerPlaceholders = () => (
    <React.Fragment>
      {[...Array(options.responsive[1200].items)].map((_, index) => (
        <div className="item" key={index}>
          <ShimmerEffect />
        </div>
      ))}
    </React.Fragment>
  );

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
        </div>
        {items.length > 0 && (
          <OwlCarousel
            className="owl-theme"
            key={isLoading ? "loading" : items.length}
            {...options}
          >
            {isLoading
              ? renderShimmerPlaceholders()
              : items.map((item) => <Item key={item.id} item={item} />)}
          </OwlCarousel>
        )}
      </div>
    </section>
  );
};

export default NewItems;
