import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Countdown = ({ itemId }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const endTime = new Date().getTime() + 6 * 60 * 60 * 1000 + itemId * 100000;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft("Expired");
        clearInterval(timer);
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

      const minutes = Math.floor((difference / (1000 * 60)) % 60);

      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [itemId]);

  return <div className="de_countdown">{timeLeft}</div>;
};

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((response) => response.json())
      .then((data) => {
        setNewItems(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading ? (
            <div className="row">
              {new Array(4).fill(0).map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                    <div className="nft_coll skeleton-card"></div>
                  </div>
                ))}
            </div>
          ) : (
            <OwlCarousel
              className="owl-theme"
              margin={10}
              key={newItems}
              responsive={{
                0: {
                  items: 1,
                },
                600: {
                  items: 2,
                },
                1000: {
                  items: 4,
                },
              }}
              nav
              loop
            >
              {newItems.map((item) => (
                <div key={item.id} data-aos="fade-right">
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && <Countdown itemId={item.expiryDate} />}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <button>
                              <i className="fa fa-facebook fa-lg"></i>
                            </button>
                            <button>
                              <i className="fa fa-twitter fa-lg"></i>
                            </button>
                            <button>
                              <i className="fa fa-envelope fa-lg"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <Link to={`item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`item-details/${item.nftId}`}>
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
            </OwlCarousel>
          )}
          {isLoading && (
            <div className="row">
              {[1, 2, 3, 4].map((item) => (
                <div className="col-lg-3 col-md-6 col-sm-12" key={item}>
                  <div className="nft__item">
                    <div className="skeleton skeleton--avatar"></div>
                    <div className="skeleton skeleton--countdown"></div>
                    <div className="skeleton skeleton--image"></div>
                    <div className="skeleton skeleton--title"></div>
                    <div className="skeleton skeleton--price"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
