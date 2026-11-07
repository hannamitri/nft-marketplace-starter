import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ReactOwlCarousel from "react-owl-carousel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewItems = ({ loading: propLoading = false }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
        .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
  }, []);
  
  if (error) return <p>Error: {error}</p>;
  
  const skeletonItems = Array.from({ length: 4 });

  function Countdown({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const difference = Number(expiryDate) - Date.now();

      if (difference <= 0) {
        setTimeLeft("EXPIRED");
        return;
      }

      const hours = Math.floor(difference / 3600000);
      const minutes = Math.floor((difference / 60000) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
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
          {propLoading || isLoading ? (
            skeletonItems.map((_, index) => (
              <div className key={index}>
                  <div className="owl-theme">
                    <div className="nft_item">
                      <Skeleton width="100%" height="180px" borderRadius="12px" />
                    </div>
                    <div className="author_list_pp">
                    <Skeleton width="60px" height="60px" borderRadius="50%" />
                    </div>
                    <div className="nft_item_wrap">
                      <Skeleton width="70%" height="20px" borderRadius="6px" />
                      <Skeleton width="40%" height="16px" borderRadius="6px" />
                    </div>
                  </div>
               </div>
                    ))
                  ) : (
<ReactOwlCarousel
  className="owl-theme"
    loop
    margin={10}
    nav
    responsive={{
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
   }}
>
        {data.map((item) => (
            <div key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                      to={`/author/${item.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                        title=""
                      >
                      <img src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                  </Link>
                </div>
                  <Countdown expiryDate={item.expiryDate} />
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
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt="New Item creater"
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>
                      {item.title}
                    </h4>
                  </Link>
                  <div className="nft__item_price">{item.price}ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
</ReactOwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
