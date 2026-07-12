import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Skeleton from "../UI/Skeleton";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 4 },
  desktop: { breakpoint: { max: 1200, min: 900 }, items: 3 },
  tablet: { breakpoint: { max: 900, min: 600 }, items: 2 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
};

const CountdownTimer = ({ expiryDate }) => {
  const calc = () => {
    const diff = expiryDate - Date.now();
    if (diff <= 0) return null;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${h}h ${m}m ${s}s`;
  };

  const [timeLeft, setTimeLeft] = useState(calc);

  useEffect(() => {
    const tick = () => {
      const diff = expiryDate - Date.now();
      if (diff <= 0) { setTimeLeft(null); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  if (!timeLeft) return null;
  return <div className="de_countdown">{timeLeft}</div>;
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [liked, setLiked] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      });
  }, []);

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12" data-aos="fade-left" data-aos-delay="100">
            <Carousel
              responsive={responsive}
              infinite={true}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              itemClass="px-2"
            >
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        </div>
                        <div className="nft__item_wrap">
                          <Skeleton width="100%" height="200px" borderRadius="10px" />
                        </div>
                        <div className="nft__item_info">
                          <Skeleton width="80%" height="20px" borderRadius="5px" />
                          <br />
                          <Skeleton width="50%" height="15px" borderRadius="5px" />
                        </div>
                      </div>
                    </div>
                  ))
                : items.map((item) => (
                <div key={item.id}>
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
                      <div
                        className="nft__item_like"
                        onClick={() => toggleLike(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={`fa fa-heart${liked[item.id] ? "" : "-o"}`}></i>
                        <span>{liked[item.id] ? item.likes + 1 : item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
