import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = React.useState(expiryDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(expiryDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  if (timeLeft <= 0) return null;

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="de_countdown">
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

const SkeletonItem = () => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <div
          className="skeleton-circle"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        ></div>
        <i className="fa fa-check" style={{ opacity: 0 }}></i>
      </div>
      <div
        className="de_countdown skeleton-box"
        style={{ width: "80px", height: "20px" }}
      ></div>
      <div className="nft__item_wrap">
        <div
          className="skeleton-box"
          style={{ height: "200px", width: "100%" }}
        ></div>
      </div>
      <div className="nft__item_info">
        <div
          className="skeleton-text"
          style={{ width: "60%", height: "20px", marginBottom: "8px" }}
        ></div>
        <div
          className="skeleton-text"
          style={{ width: "40%", height: "16px" }}
        ></div>
      </div>
    </div>
  );
};

const NewItems = () => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("Failed to load new items. Please try again later");
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    items: 4,
    slideBy: 1,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 4 },
    },
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
            {[1, 2, 3, 4].map((_, index) => (
              <div className="col-lg-3 col-md-6 col-xs-12" key={index}>
                <SkeletonItem />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>Error</h2>
              <div className="small-border bg-color-2"></div>
              <p>{error}</p>
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
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
            <OwlCarousel className="owl-theme" {...options}>
              {items.map((item) => (
                <div className="item" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && (
                      <Countdown expiryDate={item.expiryDate} />
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
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
