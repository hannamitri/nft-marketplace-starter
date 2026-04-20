import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [countDown] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchNewItems() {
      const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
      setNewItems(data);
      setLoading(false); 
    }
    fetchNewItems();
  }, []);

  const Countdown = ({ expiryDate }) => {
  const ref = React.useRef();

  useEffect(() => {
    if (!expiryDate) return;

    const updateTimer = () => {
      const timeLeftMs = new Date(expiryDate) - new Date();
      const timeLeftSeconds = Math.max(0, Math.floor(timeLeftMs / 1000));

      if (ref.current) {
        ref.current.innerText =
          timeLeftSeconds > 0 ? formatTime(timeLeftSeconds) : "EXPIRED";
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return <div ref={ref} />;
};
 
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(secs).padStart(2, '0')}`;
  };

  const options = {
    loop: true,
    margin: 10,
    dots : false,
    nav: true,
    responsive: {
    0:    { items: 1 },
    576:  { items: 2 },
    992:  { items: 3 },
    1200: { items: 4 },
  },
  };

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
            <Skeleton width="100%" height="200px" borderRadius="10px" />
          ) : (
          <OwlCarousel className="owl-theme" {...options}>
           {newItems.map((item) => {
            const timeleft = countDown[item.id];
            return (
            <div className="item" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${item.creator}`}
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && (
                  <div className="de_countdown">
                    {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}
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
            );
           })}
          </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
