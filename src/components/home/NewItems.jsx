import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//<Link to={`/users/${user.id}`} for use in dynamic links

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [owlOptions, setOwlOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expiryDates, setExpiryDates] = useState([]);
  const [countdownHours, setCountdownHours] = useState(0);
  const [countdownMinutes, setCountdownMinutes] = useState(0);
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  
  async function fetchNewItems() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    const dates = [];
    data.forEach(data => {
      dates.push(data.expiryDate);
    });
    setNewItems(data);
    setExpiryDates(dates);
  }

  useEffect(() => {
    fetchNewItems();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const owlOptions = {
      items: 4,
      loop: true,
      nav: true,
      margin: 10,
      dots: false,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
        1200: { items: 4 },
      },
    };
    setOwlOptions(owlOptions);
  }, [newItems]);

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
          <OwlCarousel className="owl-theme" {...owlOptions}>
          {
            isLoading ? (
              new Array(7).fill(0).map((_, index) => (
                <div className="display: flex;" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="skeleton-box" Style={'width:60px; height: 20px; display: block; margin: auto'} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
    
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
                          className="skeleton-box"
                          Style={'width:100%; height: 350px;'}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4 className="skeleton-box" Style={'width:180px; height: 30px;'}></h4>
                      </Link>
                      <div className="skeleton-box" Style={'width:100px; height: 20px;'}></div>
                      <div className="nft__item_like">
                        <div className="skeleton-box" Style={'width:30px; height: 15px;'}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              newItems.map((_, index) => {
              let cancelId = setInterval(updateCountdown(expiryDates[index]), 1000/60);

              function updateCountdown(expiryDate) {
                let countdown = expiryDate - Date.now();
                if (countdown < 0) {
                  countdown = 0;
                  setIsExpired(true);
                  clearInterval(cancelId);
                  cancelId = null;
                }
            
                let secondsLeft = countdown / 1000;
                let minutesLeft = secondsLeft / 60;
                let hoursLeft = minutesLeft / 60;
            
                let secondsText = Math.floor(secondsLeft) % 60;
                let minutesText = Math.floor(minutesLeft) % 60;
                let hoursText = Math.floor(hoursLeft);
                
                setCountdownHours(hoursText);
                setCountdownMinutes(minutesText);
                setCountdownSeconds(secondsText);
              }

              <div className="nft__item" key={index}>
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={newItems[index].authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {
                  (newItems[index].expiryDate !== null) ? (
                    !isExpired ? (
                      <div className="de_countdown">
                        <span>{countdownHours}</span>h
                        <span>{countdownMinutes}</span>m
                        <span>{countdownSeconds}</span>s
                      </div>
                    ) : (
                      <div className="de_countdown">EXPIRED</div>
                    )
                  ) : (
                    <></>
                  )
                }

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
                      src={newItems[index].nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{newItems[index].title}</h4>
                  </Link>
                  <div className="nft__item_price">{newItems[index].price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{newItems[index].likes}</span>
                  </div>
                </div>
              </div>
            })
          )}
        </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
