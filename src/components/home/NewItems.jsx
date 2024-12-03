import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import NewItemSkeleton from "../UI/NewItemSkeleton";

const NewItems = () => {
  const [newItemData, setNewItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    async function getNewItems() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItemData(response.data);
      } catch (error) {
        setError(error.message);
      }
    }
    setLoading(false);
    getNewItems();
  }, []);

  if (error) return <p>Error: {error}</p>;

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
          <OwlCarousel
            className="owl-theme"
            loop
            margin={1}
            nav
            items={4}
            responsive={{
              0: {
                items: 1,
              },
              775: {
                items: 2,
              },
              1000: {
                items: 3,
              },
              1400: {
                items: 4,
              },
            }}
          >
            {loading ? (
              <>
                <NewItemSkeleton />
                <NewItemSkeleton />
                <NewItemSkeleton />
                <NewItemSkeleton />
              </>
            ) : (
              newItemData.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <CountDownTimer expirationDate={item.expiryDate} />
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
              ))
            )};
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

const CountDownTimer = ({ expirationDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expirationDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expirationDate))
    }, 1000)

    return () => clearInterval(timer);

  }, [expirationDate]);

  if (timeLeft.total <= 0) {
    return <></>;
  }


  return (
    <div className="de_countdown">{`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</div>
  );
};

const calculateTimeLeft = (expirationDate) => {
  const difference = expirationDate - new Date().getTime();
  
  let timeLeft = {
    total: difference,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };

  return timeLeft;
};

export default NewItems;
