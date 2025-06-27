// src/components/NewItems.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Countdown from "react-countdown";

// Slick CSS (make sure these paths resolve in your build)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const data = await res.json();
        setItems(data);
      } catch (err) {
    
      }
    };
    fetchItems();
  }, []);

  const settings = {
    dots: false,
    arrows: true,           
    autoplay: true,         
    autoplaySpeed: 3000,    
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768,  settings: { slidesToShow: 2 } },
      { breakpoint: 480,  settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="text-center mb-4">
          <h2>New Items</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        {items.length > 0 ? (
          <Slider {...settings}>
            {items.map((item) => (
              <div key={item.id} className="px-2">
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${item.authorId}`}
                      title={`Creator: ${item.authorName}`}
                    >
                      <img
                        className="lazy"
                        src={item.authorImage}
                        alt={item.authorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="de_countdown">
                    <Countdown
                      date={new Date(item.expiryDate)}
                      renderer={({ hours, minutes, seconds, completed }) =>
                        completed ? (
                          <span>Ended</span>
                        ) : (
                          <span>
                            {hours}h {minutes}m {seconds}s
                          </span>
                        )
                      }
                    />
                  </div>

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

                    <Link to={`/item-details/${item.id}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt={item.nftName}
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.id}`}>
                      <h4>{item.nftName}</h4>
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
        ) : (
          <p>Loading new items…</p>
        )}
      </div>
    </section>
  );
};

export default NewItems;
