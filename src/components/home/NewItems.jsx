import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Countdown from '../UI/Countdown'

// const timerText = document.querySelector('.de_countdown')

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();
  const [timer, setTimer] = useState([]);

  async function fetchNewItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setTimer(data);
    // console.log(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

  let timeLeft;
  function getTimer() {
    for (let i = 0; i < timer.length; ++i) {
      let timeLeft = timer[i].expiryDate - Date.now();
      if (timeLeft > 0) {
        requestAnimationFrame(updateTimer);

        // timerText.innerHTML = '000000'
        let millisLeft = timeLeft;
        let secondsLeft = millisLeft / 1000;
        let minutesLeft = secondsLeft / 60;
        let hoursLeft = minutesLeft / 60;

        let millisText = millisLeft % 1000;
        let secondsText = Math.floor(secondsLeft) % 60;
        let minutesText = Math.floor(minutesLeft);
        let hoursText = Math.floor(hoursLeft)

        if (minutesText.toString().length < 2) {
          minutesText = minutesText.toString().padStart(2, "0");
        }
        if (secondsText.toString().length < 2) {
          secondsText = secondsText.toString().padStart(2, "0");
        }
        if (hoursText.toString().length < 2) {
          hoursText = hoursText.toString().padStart(2, "0");
        }

        // timerhours.innerHTML = hoursText
        // timerSeconds.innerHTML = secondsText
        // timerMinutes.innerHTML = minutesText
      } else {
        continue;
      }
    }
  }
  getTimer();

  function updateTimer() {}

  const responsiveness = {
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 4,
      },
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

          {!loading ? (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={10}
              responsive={responsiveness.responsive}
            >
              {items.map((data) => (
                <div className="" key={data.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={data.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">
                      <Countdown expiryDate= {data.expiryDate}/>
                    </div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a
                              href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a
                              href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to="/item-details">
                        <img
                          src={data.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{data.title}</h4>
                      </Link>
                      <div className="nft__item_price">{data.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{data.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={10}
              responsive={responsiveness.responsive}
            >
              {new Array(1).fill(0).map((data) => (
                <div className="" key={data.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">{/*  */}</div>
                    <div className="de_countdown">{data.expiryDate}</div>

                    <div className="nft__item_wrap">
                      <Link to="/item-details">
                        <img
                          src={data.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{data.title}</h4>
                      </Link>
                      <div className="nft__item_price">{data.price}</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{data.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
