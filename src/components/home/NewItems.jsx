import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const NewItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        const itemsWithCountdown = response.data.map((item) => {
          const currentTime = Math.floor(Date.now() / 1000);
          const remainingTime = item.expiryDate - currentTime;
          return { ...item, countdown: remainingTime > 0 ? remainingTime : 0 };
        });

        setTimeout(() => {
          setData(itemsWithCountdown);
          setLoading(false);
        }, 2000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  const formatCountdown = (seconds) => {
    if (seconds <= 0) return "Expired";

    const hours = Math.floor((seconds % (24 * 3600)) / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");

    return `${hours}h ${minutes}m ${secs}s`;
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>
          <Slider {...settings}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="nft__item" key={index}>
                <div className="author_list_pp">
                  <Skeleton circle height={50} width={50} />
                </div>
                <div className="de_countdown">
                  <Skeleton width="70%" />
                </div>
                <div className="nft__item_wrap">
                  <Skeleton height={200} width="100%" />
                </div>
                <div className="nft__item_info">
                  <h4>
                    <Skeleton width="60%" />
                  </h4>
                  <Skeleton width="40%" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>New Items</h2>
          <div className="small-border bg-color-2"></div>
        </div>
        <Slider {...settings}>
          {data.map((item) => (
            <div className="nft_coll" key={item.id}>
            <div className="nft__item" key={item.id}>
              <div className="author_list_pp">
                <img
                  className="lazy"
                  src={item.authorImage}
                  alt={item.creator}
                />
                <i className="fa fa-check"></i>
              </div>
              <div className="de_countdown">
                {formatCountdown(item.countdown)}
              </div>
              <div className="nft__item_wrap">
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt={item.name}
                />
              </div>
              <div className="nft__item_info">
                <h4>{item.title}</h4>
                <div>{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NewItems;