import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const PrevArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-prev" onClick={onClick}>
      ‹
    </button>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-next" onClick={onClick}>
      ›
    </button>
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeNow, setTimeNow] = useState(Date.now());

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    swipeToSlide: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const data = await response.json();
        console.log("NEW ITEMS DATA:", data);
        setItems(data);
      } catch (error) {
        console.log("NEW ITEMS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCountdown = (expiryDate) => {
    const distance = expiryDate - timeNow;

    if (distance <= 0) {
return "";
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) {
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
                  <div
                    style={{
                      background: "#eee",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginBottom: "12px",
                    }}
                  ></div>

                  <div
                    style={{
                      background: "#eee",
                      width: "100px",
                      height: "28px",
                      borderRadius: "8px",
                      marginBottom: "12px",
                    }}
                  ></div>

                  <div
                    style={{
                      background: "#eee",
                      width: "100%",
                      height: "250px",
                      borderRadius: "8px",
                      marginBottom: "12px",
                    }}
                  ></div>

                  <div
                    style={{
                      background: "#eee",
                      width: "60%",
                      height: "22px",
                      borderRadius: "4px",
                      marginBottom: "8px",
                    }}
                  ></div>

                  <div
                    style={{
                      background: "#eee",
                      width: "40%",
                      height: "18px",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>
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

          <div className="col-lg-12">
            <Slider {...settings}>
              {items.map((item, index) => (
                <div key={index}>
                  <div className="px-2">
                    <div className="nft__item">
                      <div className="author_list_pp">
                       <Link
  to={`/author/${item.authorId || item.author || item.id}`}
  data-bs-toggle="tooltip"
  data-bs-placement="top"
  title={`Creator: ${item.title}`}
>
                          <img
                            className="lazy"
                            src={item.authorImage}
                            alt={item.title}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

{getCountdown(item.expiryDate) && (
  <div className="de_countdown">
    {getCountdown(item.expiryDate)}
  </div>
)}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="/" onClick={(e) => e.preventDefault()}>
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="/" onClick={(e) => e.preventDefault()}>
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="/" onClick={(e) => e.preventDefault()}>
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/new/${item.id}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title}
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to={`/item-details/new/${item.id}`}>
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
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;