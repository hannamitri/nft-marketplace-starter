import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from "../UI/Arrows";

const NewItems = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  async function fetchItems() {
    const response = await fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );

    const data = await response.json();
    setItems(
      data.map((item) => ({
        ...item,
        nftCountdown: calculateCountdown(item.expiryDate),
      }))
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  function calculateCountdown(expiryDate) {
    if (!expiryDate) return "null";

    const now = Date.now();
    const targetTime = new Date(expiryDate).getTime();
    const difference = targetTime - now;

    if (difference <= 0) return "expired";

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    fetchItems();
    const interval = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          nftCountdown: calculateCountdown(item.expiryDate),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section data-aos="fade-up" id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading ? (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item skeleton-loading">
                  <Skeleton height="300px" />
                </div>
              </div>
            ))
          ) : (
            <Slider {...settings}>
              {items.map((item, index) => (
                <div key={index}>
                  <div className="nft__item mx-2">
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.creator}`}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.nftCountdown && item.nftCountdown !== "null" && (
                      <div className="de_countdown">
                        <span>{item.nftCountdown}</span>
                      </div>
                    )}
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
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
