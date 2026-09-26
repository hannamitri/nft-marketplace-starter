import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems



const NewItems = () => {
  const [data, setData] = useState([])
  const options = {
    responsive: {
      0: {
        items: 1,
      },
      550: {
        items: 2,
      },
      980: {
        items: 3,
      },
      1200: {
        items: 4,
      }
    }
  }

  useEffect(() => {
    async function fetchNewItems () {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
      setData(data)
      console.log(data)
    }
    fetchNewItems();
  }, []);

  const countdownMilliSeconds = document.querySelector('.countdown__millis')
  const countdownSeconds = document.querySelector('.countdown__seconds')
  const countdownMinutes = document.querySelector('.countdown__minutes')
  const countdownHours = document.querySelector('.countdown__hours')

  function countdownTimer(nft.expiryDate) {
    let millisElapsed = nft.expiryDate

    let millisLeft = nft.expiryDate - millisElapsed
    if (millisLeft < 0) {
      millisleft = 0;
    }
    let secondLeft = millisLeft / 1000
    let minutesLeft = secondsLeft / 60
    let hoursLeft = minutesLeft / 60

    let secondsText = Math.floor(secondsLeft) % 60;
    let minutesText = Math.floor(minutesLeft);
    let hoursText = Math.floor(hoursLeft);

    if (hoursText.toString().length < 2) {
      hoursText = hoursText.toString().padStart(2, '0')
    }
    if (minutesText.toString().length < 2) {
      minutesText = minutesText.toString().padStart(2, '0')
    }
    if (secondsText.toString().length < 2) {
      secondsText = secondsText.toString().padStart(2, '0')
    }
    
    countdownSeconds.innerHTML = secondsText;
    countdownMinutes.innerHTML = minutesText;
    countdownHours.innerHTML =  hoursText;
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
          {data.length > 0 && (
            <OwlCarousel className="owl-theme" loop margin={20} nav lazyLoad={true} {...options}>
              {data.map((nft) => (
                
                  <div className="nft__item" key={nft.code}>
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={nft.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown" key={nft.expiryDate}>
                      <span class="countdown__hours"></span>h:
                      <span class="countdown__minutes"></span>m:
                      <span class="countdown__seconds"></span>s
                      <span class="countdown__millis"></span>
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
                          src={nft.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{nft.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nft.price}</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{nft.likes}</span>
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
