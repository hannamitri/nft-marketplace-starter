import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles-slick.css";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Hide loading state
      }
    };
    fetchData();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const goToNext = () => sliderRef.current.slickNext();
  const goToPrev = () => sliderRef.current.slickPrev();

  const formatCountdown = (expiryTimestamp) => {
    if (!expiryTimestamp) return "0h 0m 0s";
    const now = Date.now(); // Current timestamp in milliseconds
    let secondsLeft = Math.floor((expiryTimestamp - now) / 1000); // Convert to seconds

    if (secondsLeft <= 0) return "0h 0m 0s"; // If expired, show zero

    const h = Math.floor(secondsLeft / 3600);
    const m = Math.floor((secondsLeft % 3600) / 60);
    const s = secondsLeft % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const Countdown = ({ expiryTimestamp }) => {
    const [timeLeft, setTimeLeft] = useState("0h 0m 0s");

    useEffect(() => {
      if (!expiryTimestamp) return; // ✅ Avoids running unnecessary logic

      const updateCountdown = () => {
        const formattedTime = formatCountdown(expiryTimestamp);
        setTimeLeft(formattedTime);
      };

      updateCountdown(); // Run immediately to avoid 1s delay
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }, [expiryTimestamp]);

    // ✅ Instead of returning null, return nothing if there's no expiryDate
    return expiryTimestamp ? <>{timeLeft}</> : null;
  };

  return (
    <section id="section-new-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="col-lg-12">
            {loading ? (
              <Slider {...settings}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="slider-item" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton height={200} width="100%" />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton circle={true} height={50} width={50} />
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton width="60%" height={20} />
                        <Skeleton width="40%" height={15} />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...settings} ref={sliderRef}>
                {newItems.map((item, index) => (
                  <div className="slider-item" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId || "unknown"}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.authorName || "Unknown"}`}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate && (
                        <div className="de_countdown">
                          <Countdown expiryTimestamp={item.expiryDate} />
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

                        <Link to={`/item-details/${item.id}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.id}`}>
                          <h4>{item.title || "Untitled NFT"}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {item.price || "0.00"} ETH
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}

            <div className="slider-controls">
              <button onClick={goToPrev} className="btn-prev">
                &lt;
              </button>
              <button onClick={goToNext} className="btn-next">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
