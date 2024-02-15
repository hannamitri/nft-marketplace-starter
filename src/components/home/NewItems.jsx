import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ShimmerEffect from "../UI/ShimmerEffect";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        console.log("Fetched data:", response.data);
        setItems(response.data);
        const initialCountdowns = response.data.reduce((acc, item) => {
          acc[item.id] = formatCountdown(item.expiryDate);
          return acc;
        }, {});
        setCountdowns(initialCountdowns);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const CountdownDisplay = memo(({ countdown }) => {
    return <div className="de_countdown">{countdown}</div>;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = { ...countdowns };
      let hasChanged = false;
      items.forEach((item) => {
        const newTime = formatCountdown(item.expiryDate);
        if (newTime !== newCountdowns[item.id]) {
          newCountdowns[item.id] = newTime;
          hasChanged = true;
        }
      });
      if (hasChanged) {
        setCountdowns(newCountdowns);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [items, countdowns]);

  const formatCountdown = (expiryDate) => {
    const remainingTime = (new Date(expiryDate).getTime() - Date.now()) / 1000;
    if (remainingTime <= 0) {
      return "00:00:00";
    }

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = Math.floor(remainingTime % 60);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  const renderShimmerPlaceholders = () => (
    <React.Fragment>
      {[...Array(4)].map((_, index) => (
        <div className="item" key={index}>
          <ShimmerEffect />
        </div>
      ))}
    </React.Fragment>
  );

  if (isLoading) {
    return renderShimmerPlaceholders();
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
        </div>
        {items.length > 0 && (
          <OwlCarousel className="owl-theme" key={items.length} {...options}>
            {items.map((item, index) => (
              <div className="item" key={item.id || index}>
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
                  <CountdownDisplay countdown={countdowns[item.id]} /> 
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="#" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="#" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
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
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        )}
      </div>
    </section>
  );
};

export default NewItems;