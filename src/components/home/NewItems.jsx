import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SkeletonItem = () => (
  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
    <div className="nft__item skeleton">
      <div className="author_list_pp skeleton-circle"></div>
      <div className="de_countdown skeleton-line short"></div>
      <div className="nft__item_wrap skeleton-box"></div>
      <div className="nft__item_info">
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  </div>
);

const formatTime = (milliseconds) => {
  if (milliseconds <= 0) return "00h 00m 00s";
  let totalSeconds = Math.floor(milliseconds / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  totalSeconds %= 3600;
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}h ${minutes}m ${seconds}s`;
};

const NextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <button
      className="slider-btn next-btn"
      style={{ ...style, display: "block" }}
      onClick={onClick}
      aria-label="Next Slide"
    >
      &#10095;
    </button>
  );
};

const PrevArrow = (props) => {
  const { style, onClick } = props;
  return (
    <button
      className="slider-btn prev-btn"
      style={{ ...style, display: "block" }}
      onClick={onClick}
      aria-label="Previous Slide"
    >
      &#10094;
    </button>
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(response.data);
        setLoading(false);

        // Initialize countdowns using expiryDate
        const initialCountdowns = {};
        const now = Date.now();
        response.data.forEach((item) => {
          const expiryTime = new Date(item.expiryDate).getTime();
          const remaining = expiryTime - now;
          initialCountdowns[item.id] = remaining > 0 ? remaining : 0;
        });
        setCountdowns(initialCountdowns);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setCountdowns((prevCountdowns) => {
        const updatedCountdowns = {};
        Object.keys(prevCountdowns).forEach((id) => {
          const newTime = prevCountdowns[id] - 1000;
          updatedCountdowns[id] = newTime > 0 ? newTime : 0;
        });
        return updatedCountdowns;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading]);

  const handleAuthorClick = (authorId) => {
    navigate(`/author/${authorId}`);
  };

  const handleItemClick = (itemId) => {
    navigate(`/item-details/${itemId}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />
        }
      }
    ]
  };

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            {[...Array(7)].map((_, idx) => (
              <SkeletonItem key={idx} />
            ))}
          </div>
        </div>
      </section>
    );
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
          <Slider {...settings}>
            {items.map((item) => (
              <div key={item.id}>
                <div className="nft__item">
                  <div
                    className="author_list_pp"
                    onClick={() => handleAuthorClick(item.authorId)}
                    style={{ cursor: "pointer" }}
                    title={`Creator: ${item.authorName}`}
                  >
                    <img
                      className="lazy"
                      src={item.authorImage}
                      alt={item.authorName}
                    />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="de_countdown">
                    {formatTime(countdowns[item.id])}
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

                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
                      onClick={() => handleItemClick(item.nftId)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="nft__item_info" onClick={() => handleItemClick(item.nftId)} style={{ cursor: "pointer" }}>
                    <h4>{item.title}</h4>
                    <div className="nft__item_price">{item.price} ETH</div>
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
      </div>
    </section>
  );
};

export default NewItems;
