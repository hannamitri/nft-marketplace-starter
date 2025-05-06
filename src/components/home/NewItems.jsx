import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(expiryDate) - new Date();
      if (difference <= 0) return "Expired";

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return `${hours}h ${minutes}m ${seconds}s`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,  // Ensures infinite looping
    mode: "free-snap",  // Optional: Free snapping mode for smooth transitions
    slides: {
      perView: 4,  // Number of slides visible at a time
      spacing: 15,  // Space between slides
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },  // Adjusts for smaller screens
      },
      "(min-width: 769px) and (max-width: 1024px)": {
        slides: { perView: 2, spacing: 12 },  // Adjusts for medium screens
      },
    },
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const data = await res.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch new items:", err);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle the press and hold functionality for buttons
  const handleMouseDown = (direction) => {
    const interval = setInterval(() => {
      if (direction === "prev") {
        instanceRef.current?.prev();
      } else if (direction === "next") {
        instanceRef.current?.next();
      }
    }, 100); // Adjust time for faster/slower scrolling

    // Clear interval when mouse is released or leaves the button
    const handleMouseUpOrLeave = () => {
      clearInterval(interval);
    };

    document.addEventListener("mouseup", handleMouseUpOrLeave);
    document.addEventListener("mouseleave", handleMouseUpOrLeave);
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {/* Navigation buttons for the carousel */}
            <div className="d-flex justify-content-end mb-3 gap-2">
              <button
                className="btn btn-outline-primary"
                onMouseDown={() => handleMouseDown("prev")}
              >
                &#8592; Prev
              </button>
              <button
                className="btn btn-outline-primary"
                onMouseDown={() => handleMouseDown("next")}
              >
                Next &#8594;
              </button>
            </div>

            <div ref={sliderRef} className="keen-slider">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="keen-slider__slide"
                  style={{ padding: "0 10px" }}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <CountdownTimer expiryDate={item.expiryDate} />

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="#" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="#" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="#">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${item.nftId}`} state={{ collection: item }}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`} state={{ collection: item }}>
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
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NewItems;




