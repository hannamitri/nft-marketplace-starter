import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
        );
        const data = res.data;

        setNewItems(
          data.map((e) => ({
            id: e.id,
            title: e.title,
            authorImage: e.authorImage,
            nftImage: e.nftImage,
            authorId: e.authorId,
            code: e.code,
            price: e.price,
            likes: e.likes,
            expiryDate: e.expiryDate,
          }))
        );
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 4, //adjust as needed
      spacing: 8, //space between slides (in px)
    },
    loop: true, //enables continuous loop
    mode: "free-snap",
    created() {
      setLoaded(true);
    },
  });

  function Arrow(props) {
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${props.left ? "arrow--left" : "arrow--right"} `}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  }

  //Countdown timer component
  const CountdownTimer = ({ expiryDate }) => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = expiryDate - now;

      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
      const timerInterval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timerInterval); // Cleanup on component unmount
    }, [expiryDate]);

    const formatTime = (time) => {
      const pad = (num) => (num < 10 ? `0${num}` : num);
      return `${pad(time.hours)}h ${pad(time.minutes)}m ${pad(time.seconds)}s`;
    };

    if (!expiryDate || expiryDate <= 0) {
      return null;
    }

    return (
      <>
        <div>{formatTime(timeLeft)}</div>
      </>
    );
  };

  if (isLoading) {
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
            {new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp loading-skeleton"></div>
                  <div className="nft__item_wrap aspect-ratio-1x1 loading-skeleton">
                    <div className="bg-secondary"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } else {
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
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {newItems.map((newItem, index) => (
                  <div
                    className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={index}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img
                            className="lazy"
                            src={newItem.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      
                      {newItem.expiryDate && (
                        <div className="de_countdown">
                          <CountdownTimer expiryDate={newItem.expiryDate} />
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
                            src={newItem.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{newItem.title}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {newItem.price} ETH
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{newItem.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {loaded && instanceRef.current && (
                <>
                  <div className="arrow-wrapper">
                    <Arrow left onClick={(e) => instanceRef.current?.prev()} />
                  </div>
                  <div className="arrow-wrapper__right">
                    <Arrow onClick={(e) => instanceRef.current?.next()} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default NewItems;
