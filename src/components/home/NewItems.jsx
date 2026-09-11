import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const NewItems = () => {

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("MY ITEMS:", items);
  const [time, setTime] = useState(Date.now());
  
  const getTimeLeft = (expiryDate) => {
    const difference = expiryDate - time;

    if (difference <= 0) {
      return "Expired";
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  async function fetchNewItems() {
    try {
      const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
      const data = await response.json();

      console.log("API DATA:", data);
        console.log("FIRST ITEM:", data[0]);

      setItems(data);

setTimeout(() => {
  setLoading(false);
}, 4000);

    } catch (error) {
      console.error("Error fetching new items:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

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

            
      {loading
  ? new Array(4).fill(0).map((_, index) => (
      <div
        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
        key={index}
      >
        <div className="newitem-skeleton-card">
          <div className="newitem-skeleton-author"></div>
          <div className="newitem-skeleton-image"></div>
          <div className="newitem-skeleton-title"></div>

          <div className="newitem-skeleton-bottom">
            <div className="newitem-skeleton-price"></div>
            <div className="newitem-skeleton-like"></div>
          </div>
        </div>
      </div>
    ))
 : (
  <Slider {...settings} className="new-items-slider">
    {items.map((item) => (
            <div className="new-item-slide" key={item.id}>
              <div className="nft__item author-nft-card">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${item.authorId}`}
                  >
                    <img className="lazy" 
                    src={item.authorImage} 
                    alt="" 
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  {getTimeLeft(item.expiryDate)}
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="/">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to={`/item-details/${item.nftId}`}
                    state={{ item }}>
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
          </Slider>
        )}
      
        </div>
      </div>
    </section>
  );
};

export default NewItems;
